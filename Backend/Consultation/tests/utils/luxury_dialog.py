import tkinter as tk
from tkinter import ttk
from datetime import datetime

def show_test_results_dialog(test_name, details=None):
    """Helper function to show test results dialog"""
    try:
        root = tk.Tk()
        root.title("Résultat des Tests")
        
        # Configuration de la fenêtre
        window_width = 600
        window_height = 400
        screen_width = root.winfo_screenwidth()
        screen_height = root.winfo_screenheight()
        center_x = int(screen_width/2 - window_width/2)
        center_y = int(screen_height/2 - window_height/2)
        
        root.geometry(f'{window_width}x{window_height}+{center_x}+{center_y}')
        root.configure(bg='#f0f0f0')
        
        # Styles
        style = ttk.Style()
        style.configure('Title.TLabel', font=('Helvetica', 16, 'bold'), background='#f0f0f0', foreground='#2c3e50')
        style.configure('Info.TLabel', font=('Helvetica', 11), background='#f0f0f0', foreground='#34495e')
        style.configure('Status.TLabel', font=('Helvetica', 14, 'bold'), background='#f0f0f0', foreground='#27ae60')
        style.configure('Time.TLabel', font=('Helvetica', 10), background='#f0f0f0', foreground='#7f8c8d')

        # Main frame
        main_frame = ttk.Frame(root, padding="20")
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Header with icon
        ttk.Label(main_frame, text="🏥", font=('Helvetica', 48), background='#f0f0f0').pack()
        
        # Test title
        ttk.Label(main_frame, text=test_name, style='Title.TLabel').pack(pady=10)
        
        # Status
        ttk.Label(main_frame, text="✅ Tests Réussis", style='Status.TLabel').pack(pady=10)
        
        # Separator
        ttk.Separator(main_frame, orient='horizontal').pack(fill=tk.X, pady=15)
        
        # Test details
        if details:
            for detail in details:
                ttk.Label(main_frame, text=f"✓ {detail}", style='Info.TLabel').pack(anchor='w', pady=3)
        
        # Progress bar
        progress = ttk.Progressbar(main_frame, length=400, mode='determinate')
        progress.pack(pady=20)
        
        # Timestamp
        current_time = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        ttk.Label(main_frame, text=f"Exécuté le {current_time}", style='Time.TLabel').pack(pady=10)
        
        # Close button
        close_btn = tk.Button(main_frame, text="Fermer", 
                            command=root.destroy,
                            bg='#2980b9', fg='white',
                            font=('Helvetica', 11),
                            padx=20, pady=5, border=0)
        close_btn.pack(pady=10)
        
        # Hover effects
        close_btn.bind('<Enter>', lambda e: close_btn.configure(bg='#3498db'))
        close_btn.bind('<Leave>', lambda e: close_btn.configure(bg='#2980b9'))

        # Animation
        def update_progress(value):
            if value <= 100:
                progress['value'] = value
                root.after(20, update_progress, value + 1)
        update_progress(0)

        root.attributes('-topmost', True)
        root.mainloop()

    except Exception as e:
        print(f"Impossible d'afficher la fenêtre de résultats: {str(e)}")
        print("Résultats des tests:")
        print(f"Test: {test_name}")
        if details:
            for detail in details:
                print(f"- {detail}")