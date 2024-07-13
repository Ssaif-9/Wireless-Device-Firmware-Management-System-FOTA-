import os 
import sys
#import GUI file
from ui_interface import * 
from Custom_Widgets.Widgets import *
import Custom_Widgets
from PyQt5.QtWidgets import QTableWidget 
from PySide2.QtCore import QSize 
from PyQt5.QtCore import QTimer
from PySide2.QtWidgets import QTableWidgetItem , QWidget , QHBoxLayout , QPushButton
import paho.mqtt.client as mqtt
import ssl
import uuid
from PyQt5.QtGui import QFont  # Import QFont for font settings
import serial
import time
import threading


rx=0


#main window class
class MainWindow(QMainWindow):
    
    # Method to append character to a text box
	def write_char(self,place,ch):
		textboxValue = place.toPlainText()
		place.setHtml(textboxValue+ch)
  
    # Method to remove last character from a text box
	def remove_char(self,place):
		textboxValue = place.toPlainText()
		place.setHtml(textboxValue[:-1])
	"""docstring for MainWindow"""
 
    # Method to get text from a text box
	def get_text(self,place):
		textboxValue = place.toPlainText()
		return(textboxValue)

	#function when data is received 
	
	def datareceived(self):
		self.ui.popupNotificationContainer.expandMenu()
   
	def showpopp(self):
		self.ui.popupNotificationContainer.expandMenu()
     
	#Critical show
	
	def showCritical(self):
		self.ui.CriticalModeNotification.expandMenu()
  

	#downloading show 
	def showdownloading(self):
		self.ui.DownloadingNotification.expandMenu()
  
	#hide downloading
	def hideDownloading(self):
		self.ui.DownloadingNotification.collapseMenu()

	# Method to send data 
	def send(self,data):
		if data:
			try:
				ser= serial.Serial('/dev/ttyS0',115200,timeout=1)
				for char in data:
					print(f"sent:{data}")
					ser.write(char.encode())
				ser.close()
			except Exception as e:
				print(f"error:  {e}")
	# Method to create and add a button to the table
	def CreateButton(self):
        # Create the button and set its properties
		UpdateNowButton = QPushButton()
		UpdateNowButton.setText("Update Now")
		UpdateNowButton.setStyleSheet("background-color:#50727B; border-radius:10px; font-size:17px;")
  
        # Connect the button click to the lambda function
		UpdateNowButton.clicked.connect(lambda : [self.YesResponseClicked() , UpdateNowButton.hide()])
  
        # Create a widget to contain the button
		widget = QWidget()
		layout = QHBoxLayout(widget)
		layout.addWidget(UpdateNowButton)
		widget.setLayout(layout)

        # Ensure the table has enough rows
		if self.ui.DataAnalysisTable.rowCount() <= self.row:
			self.ui.DataAnalysisTable.setRowCount(self.row +1)
   
    	# Set the widget in the table
		table_item = QTableWidgetItem()
		table_item.setSizeHint(widget.sizeHint())
		self.ui.DataAnalysisTable.setItem(self.row, 1 , table_item)
		self.ui.DataAnalysisTable.setCellWidget(self.row,1,widget)


  
    # Method to load data into the table
	def loadData(self):
		UpdateString = "Update " + (str) (self.row)
		update=[{"Update":UpdateString,"Status":"Updated"}]
        # Ensure the table has enough rows
		self.ui.DataAnalysisTable.setRowCount(self.row + 1)
  
        # Insert data into the table
		for everyUpdate in update:
			self.ui.DataAnalysisTable.setItem(self.row , 0 , QTableWidgetItem(everyUpdate["Update"]))
			self.ui.DataAnalysisTable.setItem(self.row , 1 , QTableWidgetItem(everyUpdate["Status"]))
			self.row += 1
   
    # Method to load data with "Update Now" button into the table
	def loadDataNotNow(self):
		UpdateNotNowString = "Update " + (str) (self.row)
		NotNowUpdate=[{"Update":UpdateNotNowString,"Status":self.CreateButton()}]
        # Ensure the table has enough rows
		self.ui.DataAnalysisTable.setRowCount(self.row + 1)
  
        # Insert data into the table and add the button
		for everyNotNowUpdate in NotNowUpdate:
			self.ui.DataAnalysisTable.setItem(self.row , 0 , QTableWidgetItem(everyNotNowUpdate["Update"]))
			self.ui.DataAnalysisTable.setItem(self.row , 1 , QTableWidgetItem(everyNotNowUpdate["Status"]))
			self.row +=1

   
    # Method to handle "Yes" response click
	def YesResponseClicked(self):
		self.ui.popupNotificationContainer.collapseMenu()
		self.ui.HomePage.show()
		self.ui.DataAnalysisPage.show()
		self.ui.ReportsPage.show()
		self.ui.SettingsPage.show()
		self.ui.HelpPage.show()
		self.ui.InfoPage.show()
		self.ui.MorePage.show()
		self.ui.ProfilePage.show()
		#send acknowledge to main ecu
		self.send('y')
		print('y')
		self.showdownloading()
   
    # Method to handle "Not Now" response click
	def NotNowRespnseClicked(self):
		self.send('n')
		self.loadDataNotNow()

    # Method to connect to an MQTT broker
	def connect(self, host, port, username, password):
		self.client.tls_set(tls_version=ssl.PROTOCOL_TLS)
		self.client.username_pw_set(username, password)
		self.client.connect(host, port)


    # Method to handle MQTT connection
	def on_connect(self,client, userdata, flags, rc):
		if rc == 0:
			print("CONNACK received with code Success.")
			self.client.subscribe("diagnostic")
		else:
			print("CONNACK received with code %s." % rc)
   
    # Method to handle received MQTT messages
	def on_message(self,client, userdata, msg):
		print("Received message on topic: " + msg.topic + " QoS: " + str(msg.qos) + " Message: " + str(msg.payload))

    # Method to publish an MQTT message
	def publish(self, topic, message, qos):
		return self.client.publish(topic=topic, payload=message, qos=qos)

    # Method to initialize MQTT and publish a message
	def send_mqtt_init(self):
    
		self.client.tls_set(tls_version=ssl.PROTOCOL_TLS)
		self.client.username_pw_set("RasberryPi", "Fota1234")
		self.client.connect("d7d3a966bd58441ab102101178d7e6b9.s1.eu.hivemq.cloud", 8883)
		self.client.loop_start()

    # Publish a message
		topic = "diagnostic"
		message = self.Client_id +self.get_text(self.ui.DiagnosticTextBox)
		mid = self.client.publish(topic, message, qos=1).mid
		print("Message published with MID:", mid)
  
    # Method to send MQTT messages continuously
	def send_mqtt(self):
		self.send_mqtt_init()
		try:
			while True:	
				pass
		except KeyboardInterrupt:
			print("Exiting...")
			self.client.disconnect()
			self.client.loop_stop()

	def change(self):
		global rx
		if rx==1:
			self.hideDownloading()
			self.ui.CriticalModeNotification.collapseMenu()
			self.datareceived()
			rx=0
		if rx==3:
			self.hideDownloading()
			self.loadData()
			rx=0
		if rx==2:
			self.hideDownloading()
			self.ui.popupNotificationContainer.collapseMenu()
			self.showCritical()
			rx=0
			   
	def change2(self):
		global rx
		rx=1
			

    # Constructor for the main window
	def __init__(self, parent=None):
		QMainWindow.__init__(self)
		MainWindow.ui = Ui_MainWindow()
		MainWindow.ui.setupUi(self) 
		self.row =0
		self.message=None
		self.Client_id = "yoyo.john41201@gmail.com;1472;"
		self.client = mqtt.Client(client_id=self.Client_id, userdata=None)
		self.client.on_connect = self.on_connect
		self.client.on_message = self.on_message
		header = self.ui.DataAnalysisTable.horizontalHeader()
		header.setSectionResizeMode(0, QHeaderView.Stretch)
		header.setSectionResizeMode(1, QHeaderView.Stretch)
		loadJsonStyle(self, self.ui)
		#show window 
		self.show()
  
		# EXPAND center window SIZE
		self.ui.Settings.clicked.connect(lambda : self.ui.CenterMenuContainer.expandMenu())
		self.ui.Information.clicked.connect(lambda : self.ui.CenterMenuContainer.expandMenu())
		self.ui.Help.clicked.connect(lambda : self.ui.CenterMenuContainer.expandMenu())
  
		#close center window
		self.ui.CloseCenterWindow.clicked.connect(lambda : self.ui.CenterMenuContainer.collapseMenu())
  
		# EXPAND right window SIZE
		self.ui.moreMenuBtn.clicked.connect(lambda : self.ui.rightMenuContainer.expandMenu())
		self.ui.ProfileBtn.clicked.connect(lambda : self.ui.rightMenuContainer.expandMenu())
  
		#close right window
		self.ui.CloseRightMenuBtn.clicked.connect(lambda : self.ui.rightMenuContainer.collapseMenu())
  
		#write the characters in the keyboard 
		self.ui.one.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'1'))
		self.ui.two.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'2'))
		self.ui.three.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'3'))
		self.ui.four.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'4'))
		self.ui.five.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'5'))
		self.ui.six.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'6'))
		self.ui.seven.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'7'))
		self.ui.eight.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'8'))
		self.ui.nine.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'9'))
		self.ui.zero.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'0'))
		self.ui.A.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'a'))
		self.ui.B.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'b'))
		self.ui.C.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'c'))
		self.ui.D.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'d'))
		self.ui.E.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'e'))
		self.ui.F.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'f'))
		self.ui.G.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'g'))
		self.ui.H.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'h'))
		self.ui.I.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'i'))
		self.ui.J.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'j'))
		self.ui.K.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'k'))
		self.ui.L.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'l'))
		self.ui.M.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'m'))
		self.ui.N.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'n'))
		self.ui.O.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'o'))
		self.ui.P.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'p'))
		self.ui.Q.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'q'))
		self.ui.R.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'r'))
		self.ui.S.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'s'))
		self.ui.T.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'t'))
		self.ui.U.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'u'))
		self.ui.V.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'v'))
		self.ui.W.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'w'))
		self.ui.X.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'x'))
		self.ui.Y.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'y'))
		self.ui.Z.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'z'))
		self.ui.Space.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,' '))
		self.ui.comma.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,','))
		self.ui.dot.clicked.connect(lambda : self.write_char(self.ui.DiagnosticTextBox ,'.'))
  
		#remove character in the keyboard
		self.ui.BackSpace.clicked.connect(lambda : self.remove_char(self.ui.DiagnosticTextBox))
  
		#clear the text in textbox
		self.ui.CancelBtn.clicked.connect(lambda : self.ui.DiagnosticTextBox.clear())
  
		#get the text in text box
		self.ui.SendBtn.clicked.connect(lambda : self.send_mqtt())
  
		#Yes or Not now response 
		self.ui.YesResponse.clicked.connect(lambda : self.YesResponseClicked())
		self.ui.NotNowResponse.clicked.connect(lambda : self.NotNowRespnseClicked())
		self.ui.DataAnalysis.clicked.connect(lambda : self.change2())
  
		self.timer=QTimer()
		self.timer.timeout.connect(self.change)
		self.timer.start(1000)
  
  

#ser= serial.Serial('/dev/ttyS0',115200,timeout=1)
#
#def uart_callback():
#	global rx
#	while True:
#		if ser.in_waiting > 0:
#			data=ser.read(ser.in_waiting).decode('utf-8')
#			if 'u' in data:
#				rx=1
#			elif 'c' in data:
#				rx=2
#			elif 'd' in data:
#				rx=3
#		time.sleep(0.1)
# 
#uart_thead= threading.Thread(target=uart_callback) 
#uart_thead.daemon=True
#uart_thead.start()
# Execute App
if __name__ == "__main__":
	try:
		app = QApplication(sys.argv)
		window = MainWindow()
		window.showFullScreen()
		#window.showMaximized()
		sys.exit(app.exec_())

	except KeyboardInterrupt :
		print(f"Terminated")
#	finally:
#		ser.close()

