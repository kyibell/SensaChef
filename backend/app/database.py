from dotenv import load_dotenv
import os
from supabase import create_client, Client

load_dotenv()
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY")
supabase : Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)


