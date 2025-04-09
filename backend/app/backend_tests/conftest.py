from dotenv import load_dotenv
import os

load_dotenv()

os.environ["SUPABASE_URL"] = os.environ.get("SUPABASE_URL")
os.environ["SUPABASE_ANON_KEY"] = os.environ.get("SUPABASE_ANON_KEY")
