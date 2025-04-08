import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', data);
      
      toast.success('Message sent successfully!', {
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-cream-light">
      <Helmet>
        <title>Contact Jewels by Indra | Jewelry Inquiries</title>
        <meta name="description" content="Get in touch with Jewels by Indra. Contact us for questions about our handcrafted jewelry collection, custom orders, or customer support." />
        <meta name="keywords" content="contact Jewels by Indra, jewelry inquiries, custom jewelry, jewelry support" />
      </Helmet>
      
      <Navbar />
      
      <div className="container-custom py-12 md:py-20">
        <h1 className="font-serif text-center mb-6">Contact Jewels by Indra</h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Have questions about our jewelry, your order, or need assistance? We're here to help! Reach out to us using the form below or through any of our contact channels.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl">Get In Touch</h2>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-sm text-muted-foreground mb-1">For general inquiries:</p>
                      <a href="mailto:indrajosephine7@gmail.com" className="text-gold hover:text-gold-dark">
                        indrajosephine7@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-sm text-muted-foreground mb-1">Monday-Friday, 9am-5pm EST:</p>
                      <a href="tel:+0748057641" className="text-gold hover:text-gold-dark">
                        0748057641
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Visit Our Studio</h3>
                      <p className="text-sm text-muted-foreground">
                        123 Artisan Avenue<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9am - 5pm EST<br />
                        Saturday: 10am - 4pm EST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="pt-4">
              <h3 className="font-serif text-lg mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/belle.amm_e" className="text-muted-foreground hover:text-gold transition-colors">Instagram</a>
                <a href="#" className="text-muted-foreground hover:text-gold transition-colors">Pinterest</a>
                <a href="#" className="text-muted-foreground hover:text-gold transition-colors">Facebook</a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
              <h2 className="font-serif text-2xl mb-6">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message*</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="How can we help you?"
                            className="w-full px-3 py-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[120px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <button
                    type="submit"
                    className="btn-primary w-full md:w-auto flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        Send Message <Send size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
