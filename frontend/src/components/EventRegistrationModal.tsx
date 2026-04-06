import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { useRegisterEvent, useEvents, Event, EventRegistration } from "@/hooks/useData";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, MapPin } from "lucide-react";

const formSchema = z.object({
  event_id: z.string().min(1, "Vui lòng chọn sự kiện"),
  full_name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  company: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EventRegistrationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEventId?: string;
}

const EventRegistrationModal = ({
  isOpen,
  onOpenChange,
  selectedEventId,
}: EventRegistrationModalProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { data: events } = useEvents();
  const registerEvent = useRegisterEvent();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event_id: "",
      full_name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  // Sync selected event when modal opens or selectedEventId changes
  useEffect(() => {
    if (selectedEventId) {
      form.setValue("event_id", selectedEventId);
    }
  }, [selectedEventId, form, isOpen]);

  const selectedEvent = events?.find(e => e.id === form.watch("event_id"));

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await registerEvent(values as Omit<EventRegistration, 'id' | 'created_at' | 'updated_at' | 'status'>);
      toast({
        title: "Đăng ký thành công!",
        description: "HADOCOM đã nhận được thông tin và sẽ liên hệ xác nhận sớm nhất.",
      });
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("common.errorOccurred"),
        description: error?.message || String(error) || "Có lỗi xảy ra",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-navy-light text-white border-white/10 p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan/20 to-blue-500/20 p-6 border-b border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-cyan" />
              Đăng ký tham gia sự kiện
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Điền thông tin của bạn để chúng tôi chuẩn bị đón tiếp chu đáo nhất.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {selectedEvent && (
            <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-cyan mb-2 line-clamp-1">{selectedEvent.title}</h4>
              <div className="flex flex-wrap gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(selectedEvent.start_date).toLocaleDateString('vi-VN')}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {selectedEvent.location}</span>
              </div>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="event_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn sự kiện</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 focus:ring-cyan h-11">
                          <SelectValue placeholder="-- Chọn sự kiện --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-navy border-white/10 text-white max-h-[300px]">
                        {events?.filter(e => e.status !== 'cancelled').map((event: Event) => (
                          <SelectItem key={event.id} value={event.id}>
                            {event.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.name")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("contact.namePlaceholder")}
                          className="bg-white/5 border-white/10 focus:ring-cyan h-11"
                          {...field}
                        />
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
                      <FormLabel>{t("contact.phone")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("contact.phonePlaceholder")}
                          className="bg-white/5 border-white/10 focus:ring-cyan h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.emailLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        className="bg-white/5 border-white/10 focus:ring-cyan h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Công ty (nếu có)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="HADOCOM Software"
                        className="bg-white/5 border-white/10 focus:ring-cyan h-11"
                        {...field}
                      />
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
                    <FormLabel>Lời nhắn (không bắt buộc)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tôi muốn tìm hiểu thêm về..."
                        className="min-h-[80px] bg-white/5 border-white/10 focus:ring-cyan resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-cyan hover:bg-cyan/90 text-navy font-bold py-6 rounded-xl shadow-lg shadow-cyan/20 mt-2 transition-all hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("common.sending")}
                  </>
                ) : (
                  "Xác nhận đăng ký"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationModal;
