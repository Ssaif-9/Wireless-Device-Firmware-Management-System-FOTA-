import can
import can.interfaces.vector

can_interface = 'can0'
bus = can.interface.Bus(can_interface, bustype='socketcan',bitrate=500000)

def receive_from_can():
     try:
         bus.recv()
         return True
     except can.CanError:
         return False
