from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1) PostgreSQL connection string
#    Replace 'username', 'password', and 'dbname' with your actual credentials
DATABASE_URL = "postgresql://admin:secret@postgres_db/mydatabase"

# 2) Create the database engine
engine = create_engine(DATABASE_URL, echo=True)

# 3) Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4) Base class for our models
Base = declarative_base()

