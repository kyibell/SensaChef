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
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=401, detail="Invalid credentials.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials.")

    def verify_jwt(self, jwtoken: str) -> bool:
        try:
            jwt.decode(jwtoken, JWT_SECRET, algorithms=["HS256"], audience="authenticated")
            return True
        except jwt.PyJWTError:
            return False