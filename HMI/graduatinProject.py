from tkinter import * 
from PIL import ImageTk,Image 
import tkinter
import ttkbootstrap as tb
from ttkbootstrap.dialogs import Messagebox 

#the frame of the gui
root = Tk() 
#image_path =  PhotoImage(file="Tkinter-Designer-master/gui/assets/CarImage2.gif")
#bg_image = tkinter.Label(root,image=image_path) 
#bg_image.pack()

#function for click on the button of live diagnostic 
def ClickOnButtonLiveDiagnostic(): 
    #adding Label once i clicked on the button
    LabelLiveDiagnostic = Label(root,text="Clicked on the button")
    #showing the label on the frame
    LabelLiveDiagnostic.pack()
    #adding place to enter the diagnostic 
    DiagnosticEntry = Entry(root)
    DiagnosticEntry.pack()
        
#adding button for live diagnostic
LiveDiagnosticButton = Button(root, text="Live Diagnostics" ,command=ClickOnButtonLiveDiagnostic)
#showing the button on the frame
LiveDiagnosticButton.pack()

#adding image on the frame 
Car_Image = ImageTk.PhotoImage(Image.open("Tkinter-Designer-master/gui/assets/CarImage.jpg"))
LabelCarImage = Label(image=Car_Image)
LabelCarImage.pack()

#creating function for update message box 
def UpdateMessageBox():
    #create dialog
    #yesno,
    MessageBoxUpdate = Messagebox.yesno("There's new update , you want to update it?")
    #handle message box click 
    LabelMessageBox = tb.Label(root,text='',font=("Helvetica",18))
    LabelMessageBox.pack()
    LabelMessageBox.config(text = f'You Clicked {MessageBoxUpdate}') 


#adding button box for update 
UpdateButton = Button(root, text="Update" ,command=UpdateMessageBox)
#showing the button on the frame
UpdateButton.pack()


root.mainloop()