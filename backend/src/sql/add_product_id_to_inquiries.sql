-- Add product_id column to service_inquiries table
ALTER TABLE public.service_inquiries 
ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES public.products(id) ON DELETE SET NULL;

-- Update comments for clarity
COMMENT ON COLUMN public.service_inquiries.product_id IS 'Specific product the inquiry is about, if applicable.';
COMMENT ON COLUMN public.service_inquiries.service_id IS 'Specific service the inquiry is about, if applicable (can be null if it is a product inquiry).';

-- Make service_id nullable if it is not already
ALTER TABLE public.service_inquiries ALTER COLUMN service_id DROP NOT NULL;
