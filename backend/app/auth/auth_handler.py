import jwt
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os
import time
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.environ.get("JWT_SECRET")


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=401, detail="Invalid authentication scheme.")
            
            payload = self.verify_jwt(credentials.credentials)
            if not payload:
                raise HTTPException(status_code=401, detail="Invalid or expired token.")
            
            return payload
        else:
            raise HTTPException(status_code=401, detail="Invalid authorization credentials.")

    def verify_jwt(self, jwtoken: str):
        try:
            payload = jwt.decode(jwtoken, JWT_SECRET, algorithms=["HS256"], audience="authenticated")
            return payload
        except jwt.exceptions.InvalidTokenError:
            return None