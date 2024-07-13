import can
import can.interfaces.vector
bustype = 'socketcan'
channel = 'can0'
bus = can.interface.Bus(channel=channel, bustype=bustype,bitrate=500000)


def send_to_can(ch):
    msg=can.Message(arbitration_id=0xc0ffee,data=ch,is_extended_id=False)
    try:
        bus.send(msg)
        print(f"Message sent on {bus.channel_info}")
    except can.CanError:
        print("Message NOT sent")
