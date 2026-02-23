import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Music } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_AUDIO_TYPES = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/x-m4a"];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
  songType: z.string().min(1, "Please select a song type"),
  referenceStyle: z.string().min(3, "Please describe your preferred style").max(500),
  customLyrics: z.string().max(2000).optional(),
  occasion: z.string().min(3, "Please describe the occasion").max(500),
  specialDetails: z.string().max(1000).optional(),
  tier: z.string().min(1, "Please select a pricing tier"),
});

type FormValues = z.infer<typeof formSchema>;

const OrderForm = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      songType: "",
      referenceStyle: "",
      customLyrics: "",
      occasion: "",
      specialDetails: "",
      tier: "",
    },
  });

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size must be less than 10MB");
        return;
      }
      if (!ACCEPTED_AUDIO_TYPES.includes(file.type)) {
        toast.error("Please upload an audio file (MP3, WAV, or M4A)");
        return;
      }
      setAudioFile(file);
      toast.success("Audio file uploaded successfully");
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Send email notification
      await supabase.functions.invoke('send-email', {
        body: { type: 'quote', data },
      });

      // Redirect to tier-specific Stripe payment link
      const tierLinks: Record<string, string> = {
        walkup: "https://buy.stripe.com/eVqbJ1fOe8wh7bVbQJdjO00",
        personal: "https://buy.stripe.com/cNifZh7hI5k58fZ4ohdjO02",
        anthem: "https://buy.stripe.com/bJe14ngSi7sdcwf5sldjO03",
      };
      const paymentUrl = tierLinks[data.tier];
      if (!paymentUrl) {
        toast.error("Invalid package selected.");
        return;
      }
      window.open(paymentUrl, "_blank");
      toast.success("Redirecting to payment. If a new tab didn't open, please check your popup blocker.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to process order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSubmit = async () => {
    const name = (document.getElementById('contact-name') as HTMLInputElement)?.value;
    const email = (document.getElementById('contact-email') as HTMLInputElement)?.value;
    const question = (document.getElementById('contact-question') as HTMLTextAreaElement)?.value;
    if (!name || !email || !question) {
      toast.error("Please fill in all contact fields.");
      return;
    }
    setIsContactSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: { type: 'contact', data: { name, email, question } },
      });
      if (error) throw error;
      toast.success("Your question has been submitted! We'll get back to you soon.");
      (document.getElementById('contact-name') as HTMLInputElement).value = '';
      (document.getElementById('contact-email') as HTMLInputElement).value = '';
      (document.getElementById('contact-question') as HTMLTextAreaElement).value = '';
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-warm mb-6 shadow-glow">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Start Your Custom Song
            </h2>
            <p className="text-xl text-gray-300">
              Fill out the details below and we'll create your perfect song
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-soft">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">
                    Contact Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-white/10 border-white/30 text-white placeholder:text-gray-400" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" className="bg-white/10 border-white/30 text-white placeholder:text-gray-400" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+1 (555) 000-0000" className="bg-white/10 border-white/30 text-white placeholder:text-gray-400" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Song Details */}
                <div className="space-y-4 pt-6 border-t border-white/20">
                  <h3 className="text-xl font-semibold text-white">
                    Song Details
                  </h3>

                  <FormField
                    control={form.control}
                    name="tier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Select Your Package</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/30 text-white">
                              <SelectValue placeholder="Choose a pricing tier" />
                            </SelectTrigger>
                          </FormControl>
                           <SelectContent>
                             <SelectItem value="walkup">Walk-Up Song ($99)</SelectItem>
                             <SelectItem value="personal">Personal Songs ($150)</SelectItem>
                             <SelectItem value="anthem">Professional Sonic Branding/Jingle ($600+)</SelectItem>
                           </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="songType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Song Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/30 text-white">
                              <SelectValue placeholder="What's the occasion?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="walkup">Sports Walk-up Song</SelectItem>
                            <SelectItem value="wedding">Wedding/Aisle Song</SelectItem>
                            <SelectItem value="proposal">Proposal Song</SelectItem>
                            <SelectItem value="birthday">Birthday Song</SelectItem>
                            <SelectItem value="anthem">Brand/School Anthem</SelectItem>
                            <SelectItem value="jingle">Professional Jingle/Song</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="occasion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Describe the Occasion</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about the special moment this song is for..."
                            className="min-h-[100px] bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel className="text-white">Upload Reference Song (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioChange}
                        className="cursor-pointer bg-white/10 border-white/30 text-white file:text-white"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      Upload a song that matches the style you want (MP3, WAV, M4A - Max 10MB)
                    </FormDescription>
                    {audioFile && (
                      <p className="text-sm text-primary mt-2">
                        ✓ {audioFile.name} uploaded
                      </p>
                    )}
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="referenceStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Musical Style Preferences</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Hip-hop with energetic beats, Pop ballad, Country rock..."
                            className="min-h-[80px] bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Describe the style, genre, or artists you'd like us to reference
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customLyrics"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Your Custom Lyrics (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste your lyrics here if you've written them..."
                            className="min-h-[150px] font-mono bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Leave blank if you'd like us to write the lyrics for you
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Special Details to Include</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Names to mention, inside jokes, specific moments to reference..."
                            className="min-h-[100px] bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Any specific details you want incorporated into the song
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-warm hover:opacity-90 shadow-glow text-lg py-6"
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                  <p className="text-sm text-gray-400 text-center mt-4">
                    We'll contact you to discuss further within 24 hours
                  </p>
                  <p className="text-sm text-gray-300 text-center mt-2">
                    Questions? Fill out our quick contact form below.
                  </p>
                </div>

                {/* Quick Contact Section */}
                <div className="mt-10 pt-8 border-t border-white/20 space-y-4">
                  <h3 className="text-xl font-semibold text-white text-center">
                    Have a Question? Contact Us
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-white mb-1 block">Your Name</label>
                      <Input
                        placeholder="Your name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                        id="contact-name"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white mb-1 block">Your Email</label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                        id="contact-email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-white mb-1 block">Your Question</label>
                    <Textarea
                      placeholder="Type your question here..."
                      className="min-h-[100px] bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                      id="contact-question"
                    />
                  </div>
                  <Button
                    type="button"
                    disabled={isContactSubmitting}
                    onClick={handleContactSubmit}
                    className="w-full bg-gradient-warm text-white font-semibold hover:opacity-90 py-5 shadow-glow"
                  >
                    {isContactSubmitting ? "Submitting..." : "Submit Question"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
