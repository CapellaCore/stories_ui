-- Create contact_requests table for storing contact form submissions
CREATE TABLE contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied', 'archived')),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_contact_requests_status ON contact_requests(status);
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at);
CREATE INDEX idx_contact_requests_email ON contact_requests(email);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_contact_requests_updated_at
  BEFORE UPDATE ON contact_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_requests_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting new contact requests (public access)
CREATE POLICY "Allow public to insert contact requests" ON contact_requests
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading contact requests (admin only - you can modify this later)
CREATE POLICY "Allow admin to read contact requests" ON contact_requests
  FOR SELECT USING (true); -- For now, allow all reads. You can restrict this later with auth

-- Create policy to allow updating contact requests (admin only)
CREATE POLICY "Allow admin to update contact requests" ON contact_requests
  FOR UPDATE USING (true); -- For now, allow all updates. You can restrict this later with auth
