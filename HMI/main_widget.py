import sys
import can
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton, QVBoxLayout, QPlainTextEdit, \
    QLineEdit, QDialog, QDialogButtonBox, QMessageBox, QLabel, QHBoxLayout
from PyQt5.QtGui import QPixmap, QPalette, QColor, QBrush
from PyQt5.QtCore import Qt
#from can_bus_receive import receive_from_can
#from can_bus_send import send_to_can
class UpdateWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Update Window")
        self.setGeometry(200, 200, 300, 200)
       # Add a label to the update window
        self.label = QLabel("There's an update waiting for your confirmation")
        self.label.setAlignment(Qt.AlignCenter)

        # Add a button to update now
        self.update_button = QPushButton("Update Now")
        self.update_button.clicked.connect(self.update_now)


        # Create a horizontal layout for the label and button
        hbox = QHBoxLayout()
        hbox.addWidget(self.label)
        hbox.addWidget(self.update_button)

        # Create a vertical layout and add the horizontal layout to it
        layout = QVBoxLayout()
        layout.addLayout(hbox)
        self.setLayout(layout)

    def update_now(self):
        # This method will be called when the "Update Now" button is clicked
        print("Updating now...")

       
class MainWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Notification App")
        self.setGeometry(100, 100, 400, 300)

        # Set background image
        palette = self.palette()
        palette.setBrush(QPalette.Window, QBrush(QPixmap("D:/Grad_Project_code/assets/CarImage.jpg")))
        self.setPalette(palette)


        self.center_button = QPushButton("Diagnostic")
        self.center_button.clicked.connect(self.open_dialog)
        self.center_button.setStyleSheet("color: white; font-size: 20px; background-color: rgba(0, 0, 0, 128);border-radius: 10px;")

        self.new_button = QPushButton("update")
        self.new_button.clicked.connect(self.new_button_clicked)
        self.new_button.setStyleSheet("color: white; font-size: 20px; background-color: rgba(0, 0, 0, 128);border-radius: 10px;")
        layout = QVBoxLayout()
        layout.addWidget(self.center_button, alignment=Qt.AlignCenter)
        layout.addWidget(self.new_button, alignment=Qt.AlignCenter)
        
        
        self.setLayout(layout)
        self.check_condition()

    def open_dialog(self):
        dialog = QDialog(self)
        dialog.setWindowTitle("Notification Dialog")

        layout = QVBoxLayout()
        line_edit = QLineEdit()
        send_button = QPushButton("Send")
        send_button.clicked.connect(lambda: self.send_data(line_edit.text()))
        cancel_button = QPushButton("Cancel")
        cancel_button.clicked.connect(dialog.reject)

        button_box = QDialogButtonBox()
        button_box.addButton(send_button, QDialogButtonBox.ActionRole)
        button_box.addButton(cancel_button, QDialogButtonBox.RejectRole)

        layout.addWidget(line_edit)
        layout.addWidget(button_box)
        dialog.setLayout(layout)

        dialog.exec_()
        
    def check_condition(self):
        # Replace this condition with your actual condition
        #condition = receive_from_can()

        #if condition:
            self.show_dialog()

    def show_dialog(self):
        dialog = QMessageBox(self)
        dialog.setWindowTitle("Notification Dialog")
        dialog.setText("Do you want to proceed?")
        dialog.setStandardButtons(QMessageBox.Yes | QMessageBox.No | QMessageBox.Cancel)
        dialog.setDefaultButton(QMessageBox.Yes)
        dialog.buttonClicked.connect(self.dialog_button_clicked)
        dialog.exec_()

    def dialog_button_clicked(self, button):
        if button.text() == "&Yes":
            print('y')
            #send_to_can('y')
            # Add your logic here
        elif button.text() == "&No":
            print('n')
            #send_to_can('n')
            # Add your logic here
        elif button.text() == "&Cancel":
            print('w')
            #send_to_can('w')
            # Add your logic here

    def new_button_clicked(self):
        self.update_window = UpdateWindow()
        self.update_window.show()
        #print("New button clicked")
        # Add your logic here


    def send_data(self, data):
        # Replace this with your actual data sending logic through CAN protocol
        print("Sending data:", data)


if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
