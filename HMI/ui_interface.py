# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'interfacerZwvsT.ui'
##
## Created by: Qt User Interface Compiler version 5.15.2
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide2.QtCore import *
from PySide2.QtGui import *
from PySide2.QtWidgets import *

from Custom_Widgets.Widgets import QCustomSlideMenu

import resources_rc

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        if not MainWindow.objectName():
            MainWindow.setObjectName(u"MainWindow")
        MainWindow.resize(1102, 873)
        MainWindow.setStyleSheet(u"*{\n"
"  border:none;\n"
"  background-color:transparent;\n"
"  background:transparent;\n"
"  padding:0;\n"
"  margin:0;\n"
"  color:#fff;\n"
"}\n"
"#centralwidget{\n"
"  background-color:#344955;\n"
"}\n"
"#LeftMenuSubContainer{\n"
"  background-color:#50727B;\n"
"}\n"
"#LeftMenuSubContainer QPushButton{\n"
"  text-align:left;\n"
"  padding: 2px 10px;\n"
"  border-top-left-radius:10px;\n"
"  border-bottom-left-radius:10px;\n"
"}\n"
"#frame_4{\n"
"  background-color:#50727B;\n"
"}\n"
"#CenterMenuSubContainer{\n"
"   background-color:#2c313c;\n"
"}\n"
"#headerContainer{\n"
"  background-color:#2c313c;\n"
"}")
        self.centralwidget = QWidget(MainWindow)
        self.centralwidget.setObjectName(u"centralwidget")
        self.centralwidget.setStyleSheet(u"")
        self.horizontalLayout = QHBoxLayout(self.centralwidget)
        self.horizontalLayout.setSpacing(0)
        self.horizontalLayout.setObjectName(u"horizontalLayout")
        self.horizontalLayout.setContentsMargins(0, 0, 0, 0)
        self.LeftMenuContainer = QCustomSlideMenu(self.centralwidget)
        self.LeftMenuContainer.setObjectName(u"LeftMenuContainer")
        self.LeftMenuContainer.setMaximumSize(QSize(45, 16777215))
        self.verticalLayout = QVBoxLayout(self.LeftMenuContainer)
        self.verticalLayout.setSpacing(0)
        self.verticalLayout.setObjectName(u"verticalLayout")
        self.verticalLayout.setContentsMargins(0, 0, 0, 0)
        self.LeftMenuSubContainer = QWidget(self.LeftMenuContainer)
        self.LeftMenuSubContainer.setObjectName(u"LeftMenuSubContainer")
        self.verticalLayout_2 = QVBoxLayout(self.LeftMenuSubContainer)
        self.verticalLayout_2.setSpacing(0)
        self.verticalLayout_2.setObjectName(u"verticalLayout_2")
        self.verticalLayout_2.setContentsMargins(5, 0, 0, 0)
        self.frame = QFrame(self.LeftMenuSubContainer)
        self.frame.setObjectName(u"frame")
        self.frame.setFrameShape(QFrame.StyledPanel)
        self.frame.setFrameShadow(QFrame.Raised)
        self.horizontalLayout_2 = QHBoxLayout(self.frame)
        self.horizontalLayout_2.setSpacing(0)
        self.horizontalLayout_2.setObjectName(u"horizontalLayout_2")
        self.horizontalLayout_2.setContentsMargins(0, 0, 0, 0)
        self.MenuBar = QPushButton(self.frame)
        self.MenuBar.setObjectName(u"MenuBar")
        self.MenuBar.setStyleSheet(u"")
        icon = QIcon()
        icon.addFile(u":/Icons/Icons/align-justify.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.MenuBar.setIcon(icon)
        self.MenuBar.setIconSize(QSize(24, 24))

        self.horizontalLayout_2.addWidget(self.MenuBar)


        self.verticalLayout_2.addWidget(self.frame, 0, Qt.AlignTop)

        self.frame_2 = QFrame(self.LeftMenuSubContainer)
        self.frame_2.setObjectName(u"frame_2")
        sizePolicy = QSizePolicy(QSizePolicy.Preferred, QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.frame_2.sizePolicy().hasHeightForWidth())
        self.frame_2.setSizePolicy(sizePolicy)
        self.frame_2.setFrameShape(QFrame.StyledPanel)
        self.frame_2.setFrameShadow(QFrame.Raised)
        self.verticalLayout_3 = QVBoxLayout(self.frame_2)
        self.verticalLayout_3.setSpacing(0)
        self.verticalLayout_3.setObjectName(u"verticalLayout_3")
        self.verticalLayout_3.setContentsMargins(0, 10, 0, 10)
        self.Home = QPushButton(self.frame_2)
        self.Home.setObjectName(u"Home")
        icon1 = QIcon()
        icon1.addFile(u":/Icons/Icons/home.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.Home.setIcon(icon1)
        self.Home.setIconSize(QSize(24, 24))

        self.verticalLayout_3.addWidget(self.Home)

        self.DataAnalysis = QPushButton(self.frame_2)
        self.DataAnalysis.setObjectName(u"DataAnalysis")
        icon2 = QIcon()
        icon2.addFile(u":/Icons/Icons/list.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.DataAnalysis.setIcon(icon2)
        self.DataAnalysis.setIconSize(QSize(24, 24))

        self.verticalLayout_3.addWidget(self.DataAnalysis)

        self.Reports = QPushButton(self.frame_2)
        self.Reports.setObjectName(u"Reports")
        icon3 = QIcon()
        icon3.addFile(u":/Icons/Icons/printer.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.Reports.setIcon(icon3)
        self.Reports.setIconSize(QSize(24, 24))

        self.verticalLayout_3.addWidget(self.Reports)


        self.verticalLayout_2.addWidget(self.frame_2, 0, Qt.AlignTop)

        self.frame_3 = QFrame(self.LeftMenuSubContainer)
        self.frame_3.setObjectName(u"frame_3")
        self.frame_3.setFrameShape(QFrame.StyledPanel)
        self.frame_3.setFrameShadow(QFrame.Raised)
        self.verticalLayout_4 = QVBoxLayout(self.frame_3)
        self.verticalLayout_4.setSpacing(0)
        self.verticalLayout_4.setObjectName(u"verticalLayout_4")
        self.verticalLayout_4.setContentsMargins(0, 10, 0, 10)
        self.Settings = QPushButton(self.frame_3)
        self.Settings.setObjectName(u"Settings")
        icon4 = QIcon()
        icon4.addFile(u":/Icons/Icons/settings.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.Settings.setIcon(icon4)
        self.Settings.setIconSize(QSize(24, 24))

        self.verticalLayout_4.addWidget(self.Settings)

        self.Information = QPushButton(self.frame_3)
        self.Information.setObjectName(u"Information")
        icon5 = QIcon()
        icon5.addFile(u":/Icons/Icons/info.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.Information.setIcon(icon5)
        self.Information.setIconSize(QSize(24, 24))

        self.verticalLayout_4.addWidget(self.Information)

        self.Help = QPushButton(self.frame_3)
        self.Help.setObjectName(u"Help")
        icon6 = QIcon()
        icon6.addFile(u":/Icons/Icons/help-circle.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.Help.setIcon(icon6)
        self.Help.setIconSize(QSize(24, 24))

        self.verticalLayout_4.addWidget(self.Help)


        self.verticalLayout_2.addWidget(self.frame_3, 0, Qt.AlignBottom)


        self.verticalLayout.addWidget(self.LeftMenuSubContainer, 0, Qt.AlignLeft)


        self.horizontalLayout.addWidget(self.LeftMenuContainer, 0, Qt.AlignLeft)

        self.CenterMenuContainer = QCustomSlideMenu(self.centralwidget)
        self.CenterMenuContainer.setObjectName(u"CenterMenuContainer")
        self.CenterMenuContainer.setMinimumSize(QSize(200, 0))
        self.verticalLayout_5 = QVBoxLayout(self.CenterMenuContainer)
        self.verticalLayout_5.setSpacing(0)
        self.verticalLayout_5.setObjectName(u"verticalLayout_5")
        self.verticalLayout_5.setContentsMargins(0, 0, 0, 0)
        self.CenterMenuSubContainer = QWidget(self.CenterMenuContainer)
        self.CenterMenuSubContainer.setObjectName(u"CenterMenuSubContainer")
        self.CenterMenuSubContainer.setMinimumSize(QSize(200, 0))
        self.verticalLayout_6 = QVBoxLayout(self.CenterMenuSubContainer)
        self.verticalLayout_6.setSpacing(0)
        self.verticalLayout_6.setObjectName(u"verticalLayout_6")
        self.verticalLayout_6.setContentsMargins(0, 0, 0, 0)
        self.frame_4 = QFrame(self.CenterMenuSubContainer)
        self.frame_4.setObjectName(u"frame_4")
        self.frame_4.setFrameShape(QFrame.StyledPanel)
        self.frame_4.setFrameShadow(QFrame.Raised)
        self.horizontalLayout_3 = QHBoxLayout(self.frame_4)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.label = QLabel(self.frame_4)
        self.label.setObjectName(u"label")
        self.label.setAlignment(Qt.AlignCenter)

        self.horizontalLayout_3.addWidget(self.label)

        self.CloseCenterWindow = QPushButton(self.frame_4)
        self.CloseCenterWindow.setObjectName(u"CloseCenterWindow")
        icon7 = QIcon()
        icon7.addFile(u":/Icons/Icons/x-circle.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.CloseCenterWindow.setIcon(icon7)
        self.CloseCenterWindow.setIconSize(QSize(24, 24))

        self.horizontalLayout_3.addWidget(self.CloseCenterWindow, 0, Qt.AlignRight)


        self.verticalLayout_6.addWidget(self.frame_4, 0, Qt.AlignTop)

        self.LeftPages = QStackedWidget(self.CenterMenuSubContainer)
        self.LeftPages.setObjectName(u"LeftPages")
        self.LeftPages.setMinimumSize(QSize(0, 0))
        self.SettingsPage = QWidget()
        self.SettingsPage.setObjectName(u"SettingsPage")
        self.verticalLayout_7 = QVBoxLayout(self.SettingsPage)
        self.verticalLayout_7.setObjectName(u"verticalLayout_7")
        self.pushButton_16 = QPushButton(self.SettingsPage)
        self.pushButton_16.setObjectName(u"pushButton_16")
        self.pushButton_16.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        icon8 = QIcon()
        icon8.addFile(u":/Icons/Icons/tool.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_16.setIcon(icon8)
        self.pushButton_16.setIconSize(QSize(40, 40))

        self.verticalLayout_7.addWidget(self.pushButton_16)

        self.pushButton_17 = QPushButton(self.SettingsPage)
        self.pushButton_17.setObjectName(u"pushButton_17")
        self.pushButton_17.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        icon9 = QIcon()
        icon9.addFile(u":/Icons/Icons/thermometer.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_17.setIcon(icon9)
        self.pushButton_17.setIconSize(QSize(40, 40))

        self.verticalLayout_7.addWidget(self.pushButton_17)

        self.pushButton_15 = QPushButton(self.SettingsPage)
        self.pushButton_15.setObjectName(u"pushButton_15")
        self.pushButton_15.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        icon10 = QIcon()
        icon10.addFile(u":/Icons/Icons/battery.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_15.setIcon(icon10)
        self.pushButton_15.setIconSize(QSize(40, 40))

        self.verticalLayout_7.addWidget(self.pushButton_15)

        self.LeftPages.addWidget(self.SettingsPage)
        self.HelpPage = QWidget()
        self.HelpPage.setObjectName(u"HelpPage")
        self.verticalLayout_9 = QVBoxLayout(self.HelpPage)
        self.verticalLayout_9.setObjectName(u"verticalLayout_9")
        self.pushButton_18 = QPushButton(self.HelpPage)
        self.pushButton_18.setObjectName(u"pushButton_18")
        self.pushButton_18.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        icon11 = QIcon()
        icon11.addFile(u":/Icons/Icons/phone-outgoing.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_18.setIcon(icon11)
        self.pushButton_18.setIconSize(QSize(40, 40))

        self.verticalLayout_9.addWidget(self.pushButton_18)

        self.LeftPages.addWidget(self.HelpPage)
        self.InfoPage = QWidget()
        self.InfoPage.setObjectName(u"InfoPage")
        self.verticalLayout_8 = QVBoxLayout(self.InfoPage)
        self.verticalLayout_8.setObjectName(u"verticalLayout_8")
        self.label_2 = QLabel(self.InfoPage)
        self.label_2.setObjectName(u"label_2")
        font = QFont()
        font.setPointSize(10)
        font.setBold(True)
        font.setItalic(False)
        font.setUnderline(False)
        font.setWeight(75)
        font.setStrikeOut(False)
        self.label_2.setFont(font)
        self.label_2.setTextFormat(Qt.AutoText)
        self.label_2.setScaledContents(False)
        self.label_2.setAlignment(Qt.AlignLeading|Qt.AlignLeft|Qt.AlignVCenter)

        self.verticalLayout_8.addWidget(self.label_2)

        self.LeftPages.addWidget(self.InfoPage)

        self.verticalLayout_6.addWidget(self.LeftPages)


        self.verticalLayout_5.addWidget(self.CenterMenuSubContainer, 0, Qt.AlignLeft)


        self.horizontalLayout.addWidget(self.CenterMenuContainer)

        self.MainBodyContainer = QWidget(self.centralwidget)
        self.MainBodyContainer.setObjectName(u"MainBodyContainer")
        sizePolicy1 = QSizePolicy(QSizePolicy.Expanding, QSizePolicy.Preferred)
        sizePolicy1.setHorizontalStretch(0)
        sizePolicy1.setVerticalStretch(0)
        sizePolicy1.setHeightForWidth(self.MainBodyContainer.sizePolicy().hasHeightForWidth())
        self.MainBodyContainer.setSizePolicy(sizePolicy1)
        self.MainBodyContainer.setStyleSheet(u"background-color:#AAD7D9;")
        self.verticalLayout_10 = QVBoxLayout(self.MainBodyContainer)
        self.verticalLayout_10.setSpacing(0)
        self.verticalLayout_10.setObjectName(u"verticalLayout_10")
        self.verticalLayout_10.setContentsMargins(0, 0, 0, 100)
        self.headerContainer = QWidget(self.MainBodyContainer)
        self.headerContainer.setObjectName(u"headerContainer")
        self.headerContainer.setAutoFillBackground(False)
        self.headerContainer.setStyleSheet(u"background-color:#50727B;")
        self.horizontalLayout_5 = QHBoxLayout(self.headerContainer)
        self.horizontalLayout_5.setSpacing(0)
        self.horizontalLayout_5.setObjectName(u"horizontalLayout_5")
        self.horizontalLayout_5.setContentsMargins(0, 0, 0, 0)
        self.frame_6 = QFrame(self.headerContainer)
        self.frame_6.setObjectName(u"frame_6")
        self.frame_6.setFrameShape(QFrame.StyledPanel)
        self.frame_6.setFrameShadow(QFrame.Raised)
        self.horizontalLayout_6 = QHBoxLayout(self.frame_6)
        self.horizontalLayout_6.setSpacing(0)
        self.horizontalLayout_6.setObjectName(u"horizontalLayout_6")
        self.horizontalLayout_6.setContentsMargins(11, 11, 11, 11)
        self.moreMenuBtn = QPushButton(self.frame_6)
        self.moreMenuBtn.setObjectName(u"moreMenuBtn")
        icon12 = QIcon()
        icon12.addFile(u":/Icons/Icons/more-horizontal.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.moreMenuBtn.setIcon(icon12)
        self.moreMenuBtn.setIconSize(QSize(24, 24))

        self.horizontalLayout_6.addWidget(self.moreMenuBtn)

        self.ProfileBtn = QPushButton(self.frame_6)
        self.ProfileBtn.setObjectName(u"ProfileBtn")
        icon13 = QIcon()
        icon13.addFile(u":/Icons/Icons/user.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.ProfileBtn.setIcon(icon13)
        self.ProfileBtn.setIconSize(QSize(24, 24))

        self.horizontalLayout_6.addWidget(self.ProfileBtn)


        self.horizontalLayout_5.addWidget(self.frame_6)

        self.frame_7 = QFrame(self.headerContainer)
        self.frame_7.setObjectName(u"frame_7")
        self.frame_7.setFrameShape(QFrame.StyledPanel)
        self.frame_7.setFrameShadow(QFrame.Raised)
        self.horizontalLayout_4 = QHBoxLayout(self.frame_7)
        self.horizontalLayout_4.setSpacing(0)
        self.horizontalLayout_4.setObjectName(u"horizontalLayout_4")
        self.horizontalLayout_4.setContentsMargins(11, 11, 11, 11)
        self.minimizeBtn = QPushButton(self.frame_7)
        self.minimizeBtn.setObjectName(u"minimizeBtn")
        icon14 = QIcon()
        icon14.addFile(u":/Icons/Icons/minus.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.minimizeBtn.setIcon(icon14)

        self.horizontalLayout_4.addWidget(self.minimizeBtn)

        self.restoreBtn = QPushButton(self.frame_7)
        self.restoreBtn.setObjectName(u"restoreBtn")
        icon15 = QIcon()
        icon15.addFile(u":/Icons/Icons/square.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.restoreBtn.setIcon(icon15)

        self.horizontalLayout_4.addWidget(self.restoreBtn)

        self.closeBtn = QPushButton(self.frame_7)
        self.closeBtn.setObjectName(u"closeBtn")
        icon16 = QIcon()
        icon16.addFile(u":/Icons/Icons/x.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.closeBtn.setIcon(icon16)

        self.horizontalLayout_4.addWidget(self.closeBtn)


        self.horizontalLayout_5.addWidget(self.frame_7)


        self.verticalLayout_10.addWidget(self.headerContainer, 0, Qt.AlignTop)

        self.mainBodyContent = QWidget(self.MainBodyContainer)
        self.mainBodyContent.setObjectName(u"mainBodyContent")
        sizePolicy2 = QSizePolicy(QSizePolicy.Preferred, QSizePolicy.Expanding)
        sizePolicy2.setHorizontalStretch(0)
        sizePolicy2.setVerticalStretch(0)
        sizePolicy2.setHeightForWidth(self.mainBodyContent.sizePolicy().hasHeightForWidth())
        self.mainBodyContent.setSizePolicy(sizePolicy2)
        self.mainBodyContent.setStyleSheet(u"background-color:#8CB9BD;")
        self.horizontalLayout_7 = QHBoxLayout(self.mainBodyContent)
        self.horizontalLayout_7.setSpacing(0)
        self.horizontalLayout_7.setObjectName(u"horizontalLayout_7")
        self.horizontalLayout_7.setContentsMargins(0, 0, 0, 0)
        self.mainContensContainer = QWidget(self.mainBodyContent)
        self.mainContensContainer.setObjectName(u"mainContensContainer")
        self.mainContensContainer.setStyleSheet(u"background-color:#AAD7D9;")
        self.verticalLayout_15 = QVBoxLayout(self.mainContensContainer)
        self.verticalLayout_15.setObjectName(u"verticalLayout_15")
        self.MainPages = QStackedWidget(self.mainContensContainer)
        self.MainPages.setObjectName(u"MainPages")
        self.MainPages.setStyleSheet(u"background-color:#AAD7D9;")
        self.HomePage = QWidget()
        self.HomePage.setObjectName(u"HomePage")
        self.gridLayout_2 = QGridLayout(self.HomePage)
        self.gridLayout_2.setObjectName(u"gridLayout_2")
        self.pushButton_5 = QPushButton(self.HomePage)
        self.pushButton_5.setObjectName(u"pushButton_5")
        icon17 = QIcon()
        icon17.addFile(u":/Icons/Icons/calendar.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_5.setIcon(icon17)
        self.pushButton_5.setIconSize(QSize(40, 40))

        self.gridLayout_2.addWidget(self.pushButton_5, 0, 1, 1, 1)

        self.pushButton_7 = QPushButton(self.HomePage)
        self.pushButton_7.setObjectName(u"pushButton_7")
        icon18 = QIcon()
        icon18.addFile(u":/Icons/Icons/power.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_7.setIcon(icon18)
        self.pushButton_7.setIconSize(QSize(40, 40))

        self.gridLayout_2.addWidget(self.pushButton_7, 0, 5, 1, 1)

        self.pushButton_4 = QPushButton(self.HomePage)
        self.pushButton_4.setObjectName(u"pushButton_4")
        icon19 = QIcon()
        icon19.addFile(u":/Icons/Icons/camera.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_4.setIcon(icon19)
        self.pushButton_4.setIconSize(QSize(40, 40))

        self.gridLayout_2.addWidget(self.pushButton_4, 0, 2, 1, 1)

        self.label_3 = QLabel(self.HomePage)
        self.label_3.setObjectName(u"label_3")

        self.gridLayout_2.addWidget(self.label_3, 1, 2, 1, 1)

        self.pushButton_3 = QPushButton(self.HomePage)
        self.pushButton_3.setObjectName(u"pushButton_3")
        icon20 = QIcon()
        icon20.addFile(u":/Icons/Icons/aperture.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_3.setIcon(icon20)
        self.pushButton_3.setIconSize(QSize(40, 40))

        self.gridLayout_2.addWidget(self.pushButton_3, 0, 4, 1, 1)

        self.pushButton_6 = QPushButton(self.HomePage)
        self.pushButton_6.setObjectName(u"pushButton_6")
        icon21 = QIcon()
        icon21.addFile(u":/Icons/Icons/clock.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_6.setIcon(icon21)
        self.pushButton_6.setIconSize(QSize(40, 40))

        self.gridLayout_2.addWidget(self.pushButton_6, 0, 0, 1, 1)

        self.pushButton_2 = QPushButton(self.HomePage)
        self.pushButton_2.setObjectName(u"pushButton_2")
        icon22 = QIcon()
        icon22.addFile(u":/Icons/Icons/bluetooth.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_2.setIcon(icon22)
        self.pushButton_2.setIconSize(QSize(40, 40))

        self.gridLayout_2.addWidget(self.pushButton_2, 0, 3, 1, 1)

        self.MainPages.addWidget(self.HomePage)
        self.DataAnalysisPage = QWidget()
        self.DataAnalysisPage.setObjectName(u"DataAnalysisPage")
        self.verticalLayout_17 = QVBoxLayout(self.DataAnalysisPage)
        self.verticalLayout_17.setObjectName(u"verticalLayout_17")
        self.DataAnalysisTable = QTableWidget(self.DataAnalysisPage)
        if (self.DataAnalysisTable.columnCount() < 2):
            self.DataAnalysisTable.setColumnCount(2)
        brush = QBrush(QColor(0, 0, 0, 255))
        brush.setStyle(Qt.SolidPattern)
        font1 = QFont()
        font1.setPointSize(12)
        font1.setBold(True)
        font1.setWeight(75)
        __qtablewidgetitem = QTableWidgetItem()
        __qtablewidgetitem.setFont(font1);
        __qtablewidgetitem.setBackground(QColor(97, 134, 133));
        __qtablewidgetitem.setForeground(brush);
        self.DataAnalysisTable.setHorizontalHeaderItem(0, __qtablewidgetitem)
        __qtablewidgetitem1 = QTableWidgetItem()
        __qtablewidgetitem1.setFont(font1);
        __qtablewidgetitem1.setForeground(brush);
        self.DataAnalysisTable.setHorizontalHeaderItem(1, __qtablewidgetitem1)
        self.DataAnalysisTable.setObjectName(u"DataAnalysisTable")

        self.verticalLayout_17.addWidget(self.DataAnalysisTable)

        self.MainPages.addWidget(self.DataAnalysisPage)
        self.ReportsPage = QWidget()
        self.ReportsPage.setObjectName(u"ReportsPage")
        self.verticalLayout_18 = QVBoxLayout(self.ReportsPage)
        self.verticalLayout_18.setObjectName(u"verticalLayout_18")
        self.DiagnosticTextBox = QTextEdit(self.ReportsPage)
        self.DiagnosticTextBox.setObjectName(u"DiagnosticTextBox")
        self.DiagnosticTextBox.setStyleSheet(u"background-color: rgb(243, 255, 246);")

        self.verticalLayout_18.addWidget(self.DiagnosticTextBox)

        self.SendBtn = QPushButton(self.ReportsPage)
        self.SendBtn.setObjectName(u"SendBtn")
        self.SendBtn.setStyleSheet(u"background-color:#50727B; border-radius:20px;")

        self.verticalLayout_18.addWidget(self.SendBtn)

        self.CancelBtn = QPushButton(self.ReportsPage)
        self.CancelBtn.setObjectName(u"CancelBtn")
        self.CancelBtn.setStyleSheet(u"background-color:#50727B; border-radius:20px;")

        self.verticalLayout_18.addWidget(self.CancelBtn)

        self.Keyboard = QWidget(self.ReportsPage)
        self.Keyboard.setObjectName(u"Keyboard")
        self.Keyboard.setAutoFillBackground(False)
        self.Keyboard.setStyleSheet(u"background-color:#003C43;")
        self.gridLayout = QGridLayout(self.Keyboard)
        self.gridLayout.setObjectName(u"gridLayout")
        self.gridLayout.setContentsMargins(11, 11, -1, 11)
        self.B = QPushButton(self.Keyboard)
        self.B.setObjectName(u"B")
        self.B.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.B, 3, 4, 1, 1)

        self.N = QPushButton(self.Keyboard)
        self.N.setObjectName(u"N")
        self.N.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.N, 3, 5, 1, 1)

        self.Z = QPushButton(self.Keyboard)
        self.Z.setObjectName(u"Z")
        self.Z.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.Z, 3, 0, 1, 1)

        self.nine = QPushButton(self.Keyboard)
        self.nine.setObjectName(u"nine")
        self.nine.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.nine, 0, 8, 1, 1)

        self.two = QPushButton(self.Keyboard)
        self.two.setObjectName(u"two")
        self.two.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.two, 0, 1, 1, 1)

        self.five = QPushButton(self.Keyboard)
        self.five.setObjectName(u"five")
        self.five.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.five, 0, 4, 1, 1)

        self.E = QPushButton(self.Keyboard)
        self.E.setObjectName(u"E")
        self.E.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.E, 1, 2, 1, 1)

        self.D = QPushButton(self.Keyboard)
        self.D.setObjectName(u"D")
        self.D.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.D, 2, 2, 1, 1)

        self.three = QPushButton(self.Keyboard)
        self.three.setObjectName(u"three")
        self.three.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.three, 0, 2, 1, 1)

        self.Y = QPushButton(self.Keyboard)
        self.Y.setObjectName(u"Y")
        self.Y.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.Y, 1, 5, 1, 1)

        self.J = QPushButton(self.Keyboard)
        self.J.setObjectName(u"J")
        self.J.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.J, 2, 6, 1, 1)

        self.A = QPushButton(self.Keyboard)
        self.A.setObjectName(u"A")
        self.A.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.A, 2, 0, 1, 1)

        self.F = QPushButton(self.Keyboard)
        self.F.setObjectName(u"F")
        self.F.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.F, 2, 3, 1, 1)

        self.eight = QPushButton(self.Keyboard)
        self.eight.setObjectName(u"eight")
        self.eight.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.eight, 0, 7, 1, 1)

        self.H = QPushButton(self.Keyboard)
        self.H.setObjectName(u"H")
        self.H.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.H, 2, 5, 1, 1)

        self.V = QPushButton(self.Keyboard)
        self.V.setObjectName(u"V")
        self.V.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.V, 3, 3, 1, 1)

        self.one = QPushButton(self.Keyboard)
        self.one.setObjectName(u"one")
        self.one.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.one, 0, 0, 1, 1)

        self.comma = QPushButton(self.Keyboard)
        self.comma.setObjectName(u"comma")
        self.comma.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.comma, 4, 1, 1, 1)

        self.M = QPushButton(self.Keyboard)
        self.M.setObjectName(u"M")
        self.M.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.M, 3, 6, 1, 1)

        self.S = QPushButton(self.Keyboard)
        self.S.setObjectName(u"S")
        self.S.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.S, 2, 1, 1, 1)

        self.T = QPushButton(self.Keyboard)
        self.T.setObjectName(u"T")
        self.T.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.T, 1, 4, 1, 1)

        self.U = QPushButton(self.Keyboard)
        self.U.setObjectName(u"U")
        self.U.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.U, 1, 6, 1, 1)

        self.X = QPushButton(self.Keyboard)
        self.X.setObjectName(u"X")
        self.X.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.X, 3, 1, 1, 1)

        self.G = QPushButton(self.Keyboard)
        self.G.setObjectName(u"G")
        self.G.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.G, 2, 4, 1, 1)

        self.six = QPushButton(self.Keyboard)
        self.six.setObjectName(u"six")
        self.six.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.six, 0, 5, 1, 1)

        self.seven = QPushButton(self.Keyboard)
        self.seven.setObjectName(u"seven")
        self.seven.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.seven, 0, 6, 1, 1)

        self.zero = QPushButton(self.Keyboard)
        self.zero.setObjectName(u"zero")
        self.zero.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.zero, 0, 9, 1, 1)

        self.Q = QPushButton(self.Keyboard)
        self.Q.setObjectName(u"Q")
        self.Q.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.Q, 1, 0, 1, 1)

        self.W = QPushButton(self.Keyboard)
        self.W.setObjectName(u"W")
        self.W.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.W, 1, 1, 1, 1)

        self.C = QPushButton(self.Keyboard)
        self.C.setObjectName(u"C")
        self.C.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.C, 3, 2, 1, 1)

        self.four = QPushButton(self.Keyboard)
        self.four.setObjectName(u"four")
        self.four.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.four, 0, 3, 1, 1)

        self.R = QPushButton(self.Keyboard)
        self.R.setObjectName(u"R")
        self.R.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.R, 1, 3, 1, 1)

        self.I = QPushButton(self.Keyboard)
        self.I.setObjectName(u"I")
        self.I.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.I, 1, 7, 1, 1)

        self.K = QPushButton(self.Keyboard)
        self.K.setObjectName(u"K")
        self.K.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.K, 2, 7, 1, 1)

        self.O = QPushButton(self.Keyboard)
        self.O.setObjectName(u"O")
        self.O.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.O, 1, 8, 1, 1)

        self.L = QPushButton(self.Keyboard)
        self.L.setObjectName(u"L")
        self.L.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.L, 2, 8, 1, 1)

        self.P = QPushButton(self.Keyboard)
        self.P.setObjectName(u"P")
        self.P.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.P, 1, 9, 1, 1)

        self.dot = QPushButton(self.Keyboard)
        self.dot.setObjectName(u"dot")
        self.dot.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.dot, 4, 7, 1, 1)

        self.Space = QPushButton(self.Keyboard)
        self.Space.setObjectName(u"Space")
        self.Space.setStyleSheet(u"background-color:#50727B;")

        self.gridLayout.addWidget(self.Space, 4, 2, 1, 5)

        self.BackSpace = QPushButton(self.Keyboard)
        self.BackSpace.setObjectName(u"BackSpace")
        self.BackSpace.setStyleSheet(u"background-color:#50727B;")
        icon23 = QIcon()
        icon23.addFile(u":/Icons/Icons/delete.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.BackSpace.setIcon(icon23)

        self.gridLayout.addWidget(self.BackSpace, 3, 7, 1, 1)


        self.verticalLayout_18.addWidget(self.Keyboard)

        self.MainPages.addWidget(self.ReportsPage)

        self.verticalLayout_15.addWidget(self.MainPages)


        self.horizontalLayout_7.addWidget(self.mainContensContainer)

        self.rightMenuContainer = QCustomSlideMenu(self.mainBodyContent)
        self.rightMenuContainer.setObjectName(u"rightMenuContainer")
        self.rightMenuContainer.setMinimumSize(QSize(200, 0))
        self.rightMenuContainer.setStyleSheet(u"background-color:#2c313c;")
        self.verticalLayout_11 = QVBoxLayout(self.rightMenuContainer)
        self.verticalLayout_11.setSpacing(5)
        self.verticalLayout_11.setObjectName(u"verticalLayout_11")
        self.verticalLayout_11.setContentsMargins(5, 5, 5, 5)
        self.frame_5 = QFrame(self.rightMenuContainer)
        self.frame_5.setObjectName(u"frame_5")
        self.frame_5.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        self.frame_5.setFrameShape(QFrame.StyledPanel)
        self.frame_5.setFrameShadow(QFrame.Raised)
        self.horizontalLayout_8 = QHBoxLayout(self.frame_5)
        self.horizontalLayout_8.setSpacing(7)
        self.horizontalLayout_8.setObjectName(u"horizontalLayout_8")
        self.horizontalLayout_8.setContentsMargins(11, 11, 11, 11)
        self.CloseRightMenuBtn = QPushButton(self.frame_5)
        self.CloseRightMenuBtn.setObjectName(u"CloseRightMenuBtn")
        self.CloseRightMenuBtn.setIcon(icon7)
        self.CloseRightMenuBtn.setIconSize(QSize(24, 24))

        self.horizontalLayout_8.addWidget(self.CloseRightMenuBtn, 0, Qt.AlignRight)


        self.verticalLayout_11.addWidget(self.frame_5)

        self.rightMenuSubContainer = QWidget(self.rightMenuContainer)
        self.rightMenuSubContainer.setObjectName(u"rightMenuSubContainer")
        self.rightMenuSubContainer.setMinimumSize(QSize(200, 0))
        self.rightMenuSubContainer.setStyleSheet(u"background-color:#2c313c;")
        self.verticalLayout_12 = QVBoxLayout(self.rightMenuSubContainer)
        self.verticalLayout_12.setSpacing(0)
        self.verticalLayout_12.setObjectName(u"verticalLayout_12")
        self.verticalLayout_12.setContentsMargins(0, 0, 0, 0)
        self.RightPages = QStackedWidget(self.rightMenuSubContainer)
        self.RightPages.setObjectName(u"RightPages")
        self.ProfilePage = QWidget()
        self.ProfilePage.setObjectName(u"ProfilePage")
        self.verticalLayout_13 = QVBoxLayout(self.ProfilePage)
        self.verticalLayout_13.setObjectName(u"verticalLayout_13")
        self.pushButton_8 = QPushButton(self.ProfilePage)
        self.pushButton_8.setObjectName(u"pushButton_8")
        self.pushButton_8.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        self.pushButton_8.setIcon(icon13)
        self.pushButton_8.setIconSize(QSize(30, 30))
        self.pushButton_8.setAutoDefault(False)

        self.verticalLayout_13.addWidget(self.pushButton_8)

        self.label_6 = QLabel(self.ProfilePage)
        self.label_6.setObjectName(u"label_6")
        self.label_6.setMaximumSize(QSize(16777215, 16777215))
        font2 = QFont()
        font2.setPointSize(10)
        font2.setBold(True)
        font2.setItalic(False)
        font2.setWeight(75)
        self.label_6.setFont(font2)
        self.label_6.setAlignment(Qt.AlignLeading|Qt.AlignLeft|Qt.AlignTop)

        self.verticalLayout_13.addWidget(self.label_6)

        self.pushButton_9 = QPushButton(self.ProfilePage)
        self.pushButton_9.setObjectName(u"pushButton_9")
        self.pushButton_9.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        icon24 = QIcon()
        icon24.addFile(u":/Icons/Icons/mail.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_9.setIcon(icon24)
        self.pushButton_9.setIconSize(QSize(40, 40))

        self.verticalLayout_13.addWidget(self.pushButton_9)

        self.label_8 = QLabel(self.ProfilePage)
        self.label_8.setObjectName(u"label_8")
        font3 = QFont()
        font3.setPointSize(10)
        font3.setBold(True)
        font3.setWeight(75)
        self.label_8.setFont(font3)
        self.label_8.setAlignment(Qt.AlignLeading|Qt.AlignLeft|Qt.AlignTop)

        self.verticalLayout_13.addWidget(self.label_8)

        self.pushButton_10 = QPushButton(self.ProfilePage)
        self.pushButton_10.setObjectName(u"pushButton_10")
        self.pushButton_10.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        icon25 = QIcon()
        icon25.addFile(u":/Icons/Icons/truck.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_10.setIcon(icon25)
        self.pushButton_10.setIconSize(QSize(40, 40))

        self.verticalLayout_13.addWidget(self.pushButton_10)

        self.label_14 = QLabel(self.ProfilePage)
        self.label_14.setObjectName(u"label_14")
        self.label_14.setFont(font3)
        self.label_14.setMidLineWidth(0)

        self.verticalLayout_13.addWidget(self.label_14)

        self.RightPages.addWidget(self.ProfilePage)
        self.MorePage = QWidget()
        self.MorePage.setObjectName(u"MorePage")
        self.verticalLayout_14 = QVBoxLayout(self.MorePage)
        self.verticalLayout_14.setObjectName(u"verticalLayout_14")
        self.pushButton_12 = QPushButton(self.MorePage)
        self.pushButton_12.setObjectName(u"pushButton_12")
        self.pushButton_12.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        icon26 = QIcon()
        icon26.addFile(u":/Icons/Icons/phone-call.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_12.setIcon(icon26)
        self.pushButton_12.setIconSize(QSize(40, 40))

        self.verticalLayout_14.addWidget(self.pushButton_12)

        self.pushButton_13 = QPushButton(self.MorePage)
        self.pushButton_13.setObjectName(u"pushButton_13")
        self.pushButton_13.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        icon27 = QIcon()
        icon27.addFile(u":/Icons/Icons/facebook.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_13.setIcon(icon27)
        self.pushButton_13.setIconSize(QSize(40, 40))

        self.verticalLayout_14.addWidget(self.pushButton_13)

        self.pushButton_11 = QPushButton(self.MorePage)
        self.pushButton_11.setObjectName(u"pushButton_11")
        self.pushButton_11.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        icon28 = QIcon()
        icon28.addFile(u":/Icons/Icons/instagram.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_11.setIcon(icon28)
        self.pushButton_11.setIconSize(QSize(40, 40))

        self.verticalLayout_14.addWidget(self.pushButton_11)

        self.pushButton_14 = QPushButton(self.MorePage)
        self.pushButton_14.setObjectName(u"pushButton_14")
        self.pushButton_14.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        icon29 = QIcon()
        icon29.addFile(u":/Icons/Icons/cloud.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton_14.setIcon(icon29)
        self.pushButton_14.setIconSize(QSize(40, 40))

        self.verticalLayout_14.addWidget(self.pushButton_14)

        self.RightPages.addWidget(self.MorePage)

        self.verticalLayout_12.addWidget(self.RightPages)


        self.verticalLayout_11.addWidget(self.rightMenuSubContainer, 0, Qt.AlignRight)


        self.horizontalLayout_7.addWidget(self.rightMenuContainer)


        self.verticalLayout_10.addWidget(self.mainBodyContent)

        self.widget = QWidget(self.MainBodyContainer)
        self.widget.setObjectName(u"widget")
        self.widget.setMaximumSize(QSize(20000, 5000))
        self.horizontalLayout_9 = QHBoxLayout(self.widget)
        self.horizontalLayout_9.setObjectName(u"horizontalLayout_9")
        self.popupNotificationContainer = QCustomSlideMenu(self.widget)
        self.popupNotificationContainer.setObjectName(u"popupNotificationContainer")
        sizePolicy.setHeightForWidth(self.popupNotificationContainer.sizePolicy().hasHeightForWidth())
        self.popupNotificationContainer.setSizePolicy(sizePolicy)
        self.popupNotificationContainer.setMinimumSize(QSize(0, 0))
        self.popupNotificationContainer.setMaximumSize(QSize(2000, 2000))
        self.verticalLayout_19 = QVBoxLayout(self.popupNotificationContainer)
        self.verticalLayout_19.setSpacing(0)
        self.verticalLayout_19.setObjectName(u"verticalLayout_19")
        self.verticalLayout_19.setContentsMargins(5, 5, 5, 5)
        self.popupNotificationSubContainer = QCustomSlideMenu(self.popupNotificationContainer)
        self.popupNotificationSubContainer.setObjectName(u"popupNotificationSubContainer")
        sizePolicy.setHeightForWidth(self.popupNotificationSubContainer.sizePolicy().hasHeightForWidth())
        self.popupNotificationSubContainer.setSizePolicy(sizePolicy)
        self.popupNotificationSubContainer.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        self.verticalLayout_20 = QVBoxLayout(self.popupNotificationSubContainer)
        self.verticalLayout_20.setSpacing(0)
        self.verticalLayout_20.setObjectName(u"verticalLayout_20")
        self.verticalLayout_20.setContentsMargins(0, 0, 0, 0)
        self.label_12 = QLabel(self.popupNotificationSubContainer)
        self.label_12.setObjectName(u"label_12")
        self.label_12.setFont(font3)

        self.verticalLayout_20.addWidget(self.label_12)

        self.frame_8 = QFrame(self.popupNotificationSubContainer)
        self.frame_8.setObjectName(u"frame_8")
        self.frame_8.setFrameShape(QFrame.StyledPanel)
        self.frame_8.setFrameShadow(QFrame.Raised)
        self.verticalLayout_21 = QVBoxLayout(self.frame_8)
        self.verticalLayout_21.setObjectName(u"verticalLayout_21")
        self.label_11 = QLabel(self.frame_8)
        self.label_11.setObjectName(u"label_11")
        sizePolicy1.setHeightForWidth(self.label_11.sizePolicy().hasHeightForWidth())
        self.label_11.setSizePolicy(sizePolicy1)
        font4 = QFont()
        font4.setPointSize(10)
        self.label_11.setFont(font4)
        self.label_11.setAlignment(Qt.AlignCenter)

        self.verticalLayout_21.addWidget(self.label_11)

        self.YesResponse = QPushButton(self.frame_8)
        self.YesResponse.setObjectName(u"YesResponse")

        self.verticalLayout_21.addWidget(self.YesResponse)

        self.NotNowResponse = QPushButton(self.frame_8)
        self.NotNowResponse.setObjectName(u"NotNowResponse")

        self.verticalLayout_21.addWidget(self.NotNowResponse)


        self.verticalLayout_20.addWidget(self.frame_8)


        self.verticalLayout_19.addWidget(self.popupNotificationSubContainer)


        self.horizontalLayout_9.addWidget(self.popupNotificationContainer)

        self.DownloadingNotification = QCustomSlideMenu(self.widget)
        self.DownloadingNotification.setObjectName(u"DownloadingNotification")
        self.DownloadingNotification.setMaximumSize(QSize(500, 2000))
        self.verticalLayout_25 = QVBoxLayout(self.DownloadingNotification)
        self.verticalLayout_25.setObjectName(u"verticalLayout_25")
        self.DownloadingSubNotification = QCustomSlideMenu(self.DownloadingNotification)
        self.DownloadingSubNotification.setObjectName(u"DownloadingSubNotification")
        self.DownloadingSubNotification.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        self.verticalLayout_26 = QVBoxLayout(self.DownloadingSubNotification)
        self.verticalLayout_26.setSpacing(0)
        self.verticalLayout_26.setObjectName(u"verticalLayout_26")
        self.verticalLayout_26.setContentsMargins(0, 0, 0, 0)
        self.frame_10 = QFrame(self.DownloadingSubNotification)
        self.frame_10.setObjectName(u"frame_10")
        self.frame_10.setMaximumSize(QSize(150, 300))
        self.frame_10.setFrameShape(QFrame.StyledPanel)
        self.frame_10.setFrameShadow(QFrame.Raised)
        self.verticalLayout_27 = QVBoxLayout(self.frame_10)
        self.verticalLayout_27.setObjectName(u"verticalLayout_27")
        self.label_13 = QLabel(self.frame_10)
        self.label_13.setObjectName(u"label_13")
        self.label_13.setFont(font3)
        self.label_13.setAlignment(Qt.AlignCenter)

        self.verticalLayout_27.addWidget(self.label_13)

        self.pushButton = QPushButton(self.frame_10)
        self.pushButton.setObjectName(u"pushButton")
        sizePolicy3 = QSizePolicy(QSizePolicy.Expanding, QSizePolicy.Fixed)
        sizePolicy3.setHorizontalStretch(0)
        sizePolicy3.setVerticalStretch(0)
        sizePolicy3.setHeightForWidth(self.pushButton.sizePolicy().hasHeightForWidth())
        self.pushButton.setSizePolicy(sizePolicy3)
        icon30 = QIcon()
        icon30.addFile(u":/Icons/Icons/download.svg", QSize(), QIcon.Normal, QIcon.Off)
        self.pushButton.setIcon(icon30)
        self.pushButton.setIconSize(QSize(40, 40))

        self.verticalLayout_27.addWidget(self.pushButton)


        self.verticalLayout_26.addWidget(self.frame_10)


        self.verticalLayout_25.addWidget(self.DownloadingSubNotification)


        self.horizontalLayout_9.addWidget(self.DownloadingNotification)

        self.CriticalModeNotification = QCustomSlideMenu(self.widget)
        self.CriticalModeNotification.setObjectName(u"CriticalModeNotification")
        self.CriticalModeNotification.setMaximumSize(QSize(1500, 2000))
        self.verticalLayout_22 = QVBoxLayout(self.CriticalModeNotification)
        self.verticalLayout_22.setObjectName(u"verticalLayout_22")
        self.CriticalModeSubNotification = QCustomSlideMenu(self.CriticalModeNotification)
        self.CriticalModeSubNotification.setObjectName(u"CriticalModeSubNotification")
        self.CriticalModeSubNotification.setStyleSheet(u"background-color:#50727B; border-radius:10px;")
        self.verticalLayout_23 = QVBoxLayout(self.CriticalModeSubNotification)
        self.verticalLayout_23.setObjectName(u"verticalLayout_23")
        self.frame_9 = QFrame(self.CriticalModeSubNotification)
        self.frame_9.setObjectName(u"frame_9")
        self.frame_9.setFrameShape(QFrame.StyledPanel)
        self.frame_9.setFrameShadow(QFrame.Raised)
        self.verticalLayout_24 = QVBoxLayout(self.frame_9)
        self.verticalLayout_24.setSpacing(0)
        self.verticalLayout_24.setObjectName(u"verticalLayout_24")
        self.verticalLayout_24.setContentsMargins(0, 0, 0, 0)
        self.label_9 = QLabel(self.frame_9)
        self.label_9.setObjectName(u"label_9")
        self.label_9.setFont(font3)

        self.verticalLayout_24.addWidget(self.label_9)

        self.label_10 = QLabel(self.frame_9)
        self.label_10.setObjectName(u"label_10")
        self.label_10.setFont(font3)
        self.label_10.setAlignment(Qt.AlignCenter)

        self.verticalLayout_24.addWidget(self.label_10)


        self.verticalLayout_23.addWidget(self.frame_9)


        self.verticalLayout_22.addWidget(self.CriticalModeSubNotification)


        self.horizontalLayout_9.addWidget(self.CriticalModeNotification)


        self.verticalLayout_10.addWidget(self.widget)


        self.horizontalLayout.addWidget(self.MainBodyContainer)

        MainWindow.setCentralWidget(self.centralwidget)

        self.retranslateUi(MainWindow)

        self.LeftPages.setCurrentIndex(2)
        self.MainPages.setCurrentIndex(0)
        self.RightPages.setCurrentIndex(0)


        QMetaObject.connectSlotsByName(MainWindow)
    # setupUi

    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle(QCoreApplication.translate("MainWindow", u"MainWindow", None))
#if QT_CONFIG(tooltip)
        self.MenuBar.setToolTip(QCoreApplication.translate("MainWindow", u"Menu Bar", None))
#endif // QT_CONFIG(tooltip)
        self.MenuBar.setText("")
#if QT_CONFIG(tooltip)
        self.Home.setToolTip(QCoreApplication.translate("MainWindow", u"Home", None))
#endif // QT_CONFIG(tooltip)
        self.Home.setText(QCoreApplication.translate("MainWindow", u"Home", None))
#if QT_CONFIG(tooltip)
        self.DataAnalysis.setToolTip(QCoreApplication.translate("MainWindow", u"Data Analysis", None))
#endif // QT_CONFIG(tooltip)
        self.DataAnalysis.setText(QCoreApplication.translate("MainWindow", u"Data Analysis", None))
#if QT_CONFIG(tooltip)
        self.Reports.setToolTip(QCoreApplication.translate("MainWindow", u"Reports", None))
#endif // QT_CONFIG(tooltip)
        self.Reports.setText(QCoreApplication.translate("MainWindow", u"Reports", None))
#if QT_CONFIG(tooltip)
        self.Settings.setToolTip(QCoreApplication.translate("MainWindow", u"Settings", None))
#endif // QT_CONFIG(tooltip)
        self.Settings.setText(QCoreApplication.translate("MainWindow", u"Settings", None))
#if QT_CONFIG(tooltip)
        self.Information.setToolTip(QCoreApplication.translate("MainWindow", u"Information about the app", None))
#endif // QT_CONFIG(tooltip)
        self.Information.setText(QCoreApplication.translate("MainWindow", u"Information", None))
#if QT_CONFIG(tooltip)
        self.Help.setToolTip(QCoreApplication.translate("MainWindow", u"Help", None))
#endif // QT_CONFIG(tooltip)
        self.Help.setText(QCoreApplication.translate("MainWindow", u"Help", None))
        self.label.setText(QCoreApplication.translate("MainWindow", u"More Menu", None))
#if QT_CONFIG(tooltip)
        self.CloseCenterWindow.setToolTip(QCoreApplication.translate("MainWindow", u"close Menu", None))
#endif // QT_CONFIG(tooltip)
        self.CloseCenterWindow.setText("")
        self.pushButton_16.setText("")
        self.pushButton_17.setText("")
        self.pushButton_15.setText("")
        self.pushButton_18.setText("")
        self.label_2.setText(QCoreApplication.translate("MainWindow", u"<html><head/><body><p>The FOTA project</p><p>allows you to </p><p>update your device's </p><p>firmware remotely </p><p>using a wireless </p><p>connection. This </p><p>means you can </p><p>get the latest </p><p>features, security </p><p>patches, and </p><p>improvements without </p><p>needing to connect </p><p>your device physically</p><p>to a computer. </p><p>It's efficient, secure, </p><p>and ensures your </p><p>device stays </p><p>up-to-date </p><p>with minimal effort </p><p>from you.</p></body></html>", None))
#if QT_CONFIG(tooltip)
        self.moreMenuBtn.setToolTip(QCoreApplication.translate("MainWindow", u"More", None))
#endif // QT_CONFIG(tooltip)
        self.moreMenuBtn.setText("")
#if QT_CONFIG(tooltip)
        self.ProfileBtn.setToolTip(QCoreApplication.translate("MainWindow", u"Profile", None))
#endif // QT_CONFIG(tooltip)
        self.ProfileBtn.setText("")
#if QT_CONFIG(tooltip)
        self.minimizeBtn.setToolTip(QCoreApplication.translate("MainWindow", u"minimize window", None))
#endif // QT_CONFIG(tooltip)
        self.minimizeBtn.setText("")
#if QT_CONFIG(tooltip)
        self.restoreBtn.setToolTip(QCoreApplication.translate("MainWindow", u"Restore window", None))
#endif // QT_CONFIG(tooltip)
        self.restoreBtn.setText("")
#if QT_CONFIG(tooltip)
        self.closeBtn.setToolTip(QCoreApplication.translate("MainWindow", u"close window", None))
#endif // QT_CONFIG(tooltip)
        self.closeBtn.setText("")
        self.pushButton_5.setText("")
        self.pushButton_7.setText("")
        self.pushButton_4.setText("")
        self.label_3.setText("")
        self.pushButton_3.setText("")
        self.pushButton_6.setText("")
        self.pushButton_2.setText("")
        ___qtablewidgetitem = self.DataAnalysisTable.horizontalHeaderItem(0)
        ___qtablewidgetitem.setText(QCoreApplication.translate("MainWindow", u"Update", None));
        ___qtablewidgetitem1 = self.DataAnalysisTable.horizontalHeaderItem(1)
        ___qtablewidgetitem1.setText(QCoreApplication.translate("MainWindow", u"Status", None));
        self.SendBtn.setText(QCoreApplication.translate("MainWindow", u"Send", None))
        self.CancelBtn.setText(QCoreApplication.translate("MainWindow", u"Cancel", None))
        self.B.setText(QCoreApplication.translate("MainWindow", u"B", None))
        self.N.setText(QCoreApplication.translate("MainWindow", u"N", None))
        self.Z.setText(QCoreApplication.translate("MainWindow", u"Z", None))
        self.nine.setText(QCoreApplication.translate("MainWindow", u"9", None))
        self.two.setText(QCoreApplication.translate("MainWindow", u"2", None))
        self.five.setText(QCoreApplication.translate("MainWindow", u"5", None))
        self.E.setText(QCoreApplication.translate("MainWindow", u"E", None))
        self.D.setText(QCoreApplication.translate("MainWindow", u"D", None))
        self.three.setText(QCoreApplication.translate("MainWindow", u"3", None))
        self.Y.setText(QCoreApplication.translate("MainWindow", u"Y", None))
        self.J.setText(QCoreApplication.translate("MainWindow", u"J", None))
        self.A.setText(QCoreApplication.translate("MainWindow", u"A", None))
        self.F.setText(QCoreApplication.translate("MainWindow", u"F", None))
        self.eight.setText(QCoreApplication.translate("MainWindow", u"8", None))
        self.H.setText(QCoreApplication.translate("MainWindow", u"H", None))
        self.V.setText(QCoreApplication.translate("MainWindow", u"V", None))
        self.one.setText(QCoreApplication.translate("MainWindow", u"1", None))
        self.comma.setText(QCoreApplication.translate("MainWindow", u",", None))
        self.M.setText(QCoreApplication.translate("MainWindow", u"M", None))
        self.S.setText(QCoreApplication.translate("MainWindow", u"S", None))
        self.T.setText(QCoreApplication.translate("MainWindow", u"T", None))
        self.U.setText(QCoreApplication.translate("MainWindow", u"U", None))
        self.X.setText(QCoreApplication.translate("MainWindow", u"X", None))
        self.G.setText(QCoreApplication.translate("MainWindow", u"G", None))
        self.six.setText(QCoreApplication.translate("MainWindow", u"6", None))
        self.seven.setText(QCoreApplication.translate("MainWindow", u"7", None))
        self.zero.setText(QCoreApplication.translate("MainWindow", u"0", None))
        self.Q.setText(QCoreApplication.translate("MainWindow", u"Q", None))
        self.W.setText(QCoreApplication.translate("MainWindow", u"W", None))
        self.C.setText(QCoreApplication.translate("MainWindow", u"C", None))
        self.four.setText(QCoreApplication.translate("MainWindow", u"4", None))
        self.R.setText(QCoreApplication.translate("MainWindow", u"R", None))
        self.I.setText(QCoreApplication.translate("MainWindow", u"I", None))
        self.K.setText(QCoreApplication.translate("MainWindow", u"K", None))
        self.O.setText(QCoreApplication.translate("MainWindow", u"O", None))
        self.L.setText(QCoreApplication.translate("MainWindow", u"L", None))
        self.P.setText(QCoreApplication.translate("MainWindow", u"P", None))
        self.dot.setText(QCoreApplication.translate("MainWindow", u".", None))
        self.Space.setText(QCoreApplication.translate("MainWindow", u"Space", None))
        self.BackSpace.setText("")
#if QT_CONFIG(tooltip)
        self.CloseRightMenuBtn.setToolTip(QCoreApplication.translate("MainWindow", u"close Menu", None))
#endif // QT_CONFIG(tooltip)
        self.CloseRightMenuBtn.setText("")
        self.pushButton_8.setText("")
        self.label_6.setText(QCoreApplication.translate("MainWindow", u"Mark Akram", None))
        self.pushButton_9.setText("")
        self.label_8.setText(QCoreApplication.translate("MainWindow", u"markakram@gmail.com", None))
        self.pushButton_10.setText("")
        self.label_14.setText(QCoreApplication.translate("MainWindow", u"Hyundai Elantra", None))
        self.pushButton_12.setText("")
        self.pushButton_13.setText("")
        self.pushButton_11.setText("")
        self.pushButton_14.setText("")
        self.label_12.setText(QCoreApplication.translate("MainWindow", u"Notification", None))
        self.label_11.setText(QCoreApplication.translate("MainWindow", u"There's new update, you want update now?", None))
        self.YesResponse.setText(QCoreApplication.translate("MainWindow", u"Yes", None))
        self.NotNowResponse.setText(QCoreApplication.translate("MainWindow", u"Not Now", None))
        self.label_13.setText(QCoreApplication.translate("MainWindow", u"Downloading", None))
        self.pushButton.setText("")
        self.label_9.setText(QCoreApplication.translate("MainWindow", u"Warning Notification", None))
        self.label_10.setText(QCoreApplication.translate("MainWindow", u"<html><head/><body><p>The car is in Critical Mode Please turn off the Engine </p></body></html>", None))
    # retranslateUi

