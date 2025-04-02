from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
# from fastapi.templating import Jinja`2Templates
import cv2 # OpenCV import
import logging # for error handling
import socket # for handling socket infinite loop once the connection is closed

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
        if not self.video.isOpened():
            raise RuntimeError("Camera could not be opened.")
        self.socket = None # Sets when the connection is initalized
    def __del__(self):
        if self.video.isOpened():
            self.video.release() # For Deleting the video/stopping the streaming
    def get_frames(self): # Reading the video to return the frames
        ret, frame = self.video.read() # ret = return 
        if not ret: # If there's no return, error handle
            logging.warning('No Frames.')
            return b''
        ret, jpeg = cv2.imencode('.jpg', frame) # encode img format and streams data
        return jpeg.tobytes() # Return each frame as a jpg in bytes


async def generate_camera(camera, request: Request):
    try:
        while True: # Inf. loop to get frames
            if await request.is_disconnected(): # To fix inf loop
                print("Client Disconnected.")
                break

            frame = camera.get_frames() # Get the Frame from the Camera Class
            if frame:
                yield (b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n') # More 'Features' from openCV Docs, have to provide the img extension (jpeg)
            else:
                print("No frame recived, stopping stream...")
                break
    except Exception as error:
        print("Streaming Error.")
    finally:
        del camera # Make sure the camera is deleted
    

@router.get('/api/camera')
async def get_video_feed(request: Request):
    camera = Camera()
    return StreamingResponse(
        generate_camera(camera, request),
        media_type='multipart/x-mixed-replace; boundary=frame'
    )