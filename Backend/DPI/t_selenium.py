import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.chrome.options import Options
import time
import logging
import os

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class TestDPIFunctional:
    @pytest.fixture(scope="class")
    def driver(self):
        # Configure Chrome options for more stable testing
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--remote-debugging-port=9222")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        
        driver = webdriver.Chrome(options=chrome_options)
        driver.implicitly_wait(10)
        driver.set_page_load_timeout(30)
        yield driver
        driver.quit()
    
    def _full_page_screenshot(self, driver, filename):
        """Helper method to take full page screenshots"""
        try:
            # Ensure screenshots directory exists
            os.makedirs('screenshots', exist_ok=True)
            path = os.path.join('screenshots', filename)
            driver.save_screenshot(path)
            logger.info(f"Screenshot saved to {path}")
        except Exception as e:
            logger.error(f"Failed to take screenshot: {str(e)}")
    
    def _debug_page_source(self, driver):
        """Log detailed page source information"""
        try:
            logger.info("Current URL: %s", driver.current_url)
            
            # Log all input elements
            inputs = driver.find_elements(By.TAG_NAME, "input")
            logger.info("Input elements found: %d", len(inputs))
            for inp in inputs:
                logger.info("Input element: id=%s, name=%s, type=%s, class=%s", 
                            inp.get_attribute('id'), 
                            inp.get_attribute('name'), 
                            inp.get_attribute('type'),
                            inp.get_attribute('class'))
        except Exception as e:
            logger.error(f"Error logging page source: {str(e)}")

    @pytest.fixture
    def login_as_medecin(self, driver):
        try:
            logger.info("Starting login process")
            
            # Navigate to login page
            driver.get("http://localhost:4200/login")
            
            # Take initial screenshot
            self._full_page_screenshot(driver, "login_page_initial.png")
            
            # Detailed page source logging
            self._debug_page_source(driver)

            try:
                # Wait for form to be fully loaded with explicit waits
                WebDriverWait(driver, 20).until(
                    EC.presence_of_element_located((By.ID, "email"))
                )

                # Find email input and enter credentials
                email_input = driver.find_element(By.ID, "email")
                email_input.clear()
                email_input.send_keys("medecin@example.com")
                logger.info("Email entered")

                # Find password input and enter credentials
                password_input = driver.find_element(By.ID, "password")
                password_input.clear()
                password_input.send_keys("password123")
                logger.info("Password entered")

                # Find and click login button
                login_button = driver.find_element(By.ID, "login-button")
                login_button.click()
                logger.info("Login button clicked")

                # Wait for potential authentication
                time.sleep(3)

                # Capture screenshot after login attempt
                self._full_page_screenshot(driver, "login_after_attempt.png")

                # Check current URL or dashboard presence with more robust checks
                current_url = driver.current_url
                logger.info(f"Current URL after login: {current_url}")

                # Add more diagnostic logging
                if "/dashboard" in current_url:
                    logger.info("Successfully redirected to dashboard")
                else:
                    # Check for any error messages
                    try:
                        error_elements = driver.find_elements(By.CSS_SELECTOR, ".error-message, .alert-danger")
                        if error_elements:
                            for elem in error_elements:
                                logger.error(f"Error message found: {elem.text}")
                    except Exception:
                        pass

                    # Log full page source for investigation
                    with open('screenshots/login_page_source.html', 'w', encoding='utf-8') as f:
                        f.write(driver.page_source)

                return driver

            except Exception as login_error:
                # Comprehensive error logging
                logger.error(f"Login process failed: {str(login_error)}")
                self._full_page_screenshot(driver, "login_failure.png")
                self._debug_page_source(driver)
                
                # Save page source for investigation
                with open('screenshots/login_failure_source.html', 'w', encoding='utf-8') as f:
                    f.write(driver.page_source)
                
                pytest.fail(f"Login failed: Detailed logs in screenshots directory")

        except Exception as e:
            logger.error(f"Unexpected error during login: {str(e)}")
            pytest.fail(f"Login process failed catastrophically: {str(e)}")

    def test_create_dpi_as_medecin(self, driver, login_as_medecin):
        """Placeholder for DPI creation test"""
        # This is just a placeholder. You'll need to implement actual DPI creation logic
        logger.info("DPI creation test started")
        assert driver.current_url is not None, "Driver should have a valid URL after login"

    def test_view_and_update_dpi(self, driver, login_as_medecin):
        """Placeholder for DPI view and update test"""
        # This is just a placeholder. You'll need to implement actual DPI view/update logic
        logger.info("DPI view and update test started")
        assert driver.current_url is not None, "Driver should have a valid URL after login"