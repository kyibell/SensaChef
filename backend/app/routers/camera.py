from fastapi import APIRouter, Response, render_template
import cv2 # OpenCV import

"""
Any string with b'' is a byte string. Indicates that the string is a sequence of bytes and not unicode chracters.

e.g byte_string = b'Hello World'
print(byte_string) 
Expected output would be b'Hello World!'

however
for byte in byte_string
    print(byte)
    Expected
    72
    101
    108
    ...
"""

# Define the Router
router = APIRouter()

# Camera Class
class Camera:
    def __init__(self):
        self.video = cv2.VideoCapture(0) # 0 for webcam access
    def __del__(self):
        self.video.release() # For Deleting the video/stopping the streaming
    def get_frames(self): # Reading the video to return the frames
        ret, frame = self.video.read() # ret = return 
        if not ret: # If there's no return, error handle
            print('No Frames.')
            return b''
        ret, jpeg = cv2.imencode('.jpg', frame) # encode img format and streams data
        if not ret:
            return b''
        return jpeg.tobytes() # Return each frame as a jpg in bytes

router.get('/')
def index():
    return render_template('Camera.jsx')

def generate_camera(camera):
    while True: # Inf. loop to get frames
        frame = camera.get_frames() # Get the Frame from the Camera Class
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        


router.get('/video-feed')
def get_video_feed():
    pass