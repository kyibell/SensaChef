from pydantic import BaseModel

class Settings(BaseModel):
    AWK_AK: str
    AWL_SAK: str

    class Config:
        env_file = '.env'

