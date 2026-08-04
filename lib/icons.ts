import { Github, Linkedin, Mail, MessageCircle, Phone, Twitter } from "lucide-react";

export const CONTACT_ICONS = {
  phone: Phone,
  twitter: Twitter,
  mail: Mail,
  whatsapp: MessageCircle,
  github: Github,
  linkedin: Linkedin,
} as const;

export type ContactIconName = keyof typeof CONTACT_ICONS;
