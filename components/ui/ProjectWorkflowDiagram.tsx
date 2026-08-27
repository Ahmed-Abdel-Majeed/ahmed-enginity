'use client';

import React from 'react';

interface ProjectDiagramProps {
  projectId: string;
  isAr?: boolean;
}

export default function ProjectWorkflowDiagram({ projectId, isAr = false }: ProjectDiagramProps) {
  // Common node styling helpers
  const getNodeColor = (type: 'input' | 'ai' | 'process' | 'output') => {
    switch (type) {
      case 'input':
        return { bg: 'rgba(0, 212, 255, 0.08)', border: 'rgba(0, 212, 255, 0.3)', text: '#00d4ff', pulse: '#00d4ff' };
      case 'ai':
        return { bg: 'rgba(167, 139, 250, 0.08)', border: 'rgba(167, 139, 250, 0.3)', text: '#a78bfa', pulse: '#a78bfa' };
      case 'process':
        return { bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.3)', text: '#f59e0b', pulse: '#f59e0b' };
      case 'output':
        return { bg: 'rgba(45, 212, 191, 0.08)', border: 'rgba(45, 212, 191, 0.3)', text: '#2dd4bf', pulse: '#2dd4bf' };
    }
  };

  // Define steps per project based strictly on verified technologies in projects.json
  const getWorkflowSteps = () => {
    switch (projectId) {
      case 'whatsapp-ai-platform':
        return [
          { type: 'input', label: 'WhatsApp', sub: isAr ? 'رسالة العميل' : 'Customer Message', tech: 'WhatsApp API' },
          { type: 'ai', label: 'AI Agent', sub: isAr ? 'المعالجة والتأهيل' : 'GPT-4 Triage', tech: 'n8n + OpenAI' },
          { type: 'process', label: 'Database / CRM', sub: isAr ? 'حفظ السجل والعميل' : 'History & Sync', tech: 'Supabase' },
          { type: 'output', label: isAr ? 'التصعيد البشري' : 'Human Esc.', sub: isAr ? 'تنبيه الفريق' : 'Team Alert', tech: 'Flutter / Web' },
        ];
      case 'clinic-automation':
        return [
          { type: 'input', label: 'Patient Request', sub: isAr ? 'طلب واتساب/تيليغرام' : 'WhatsApp / Telegram', tech: 'Bot APIs' },
          { type: 'ai', label: 'Smart Scheduling', sub: isAr ? 'الفرز والجدولة' : 'AI Triage', tech: 'n8n + OpenAI' },
          { type: 'process', label: 'Auto Reports', sub: isAr ? 'مزامنة المواعيد' : 'Patient Logging', tech: 'Google Sheets' },
          { type: 'output', label: 'Reminders', sub: isAr ? 'تذكير أوتوماتيكي' : 'Automated Reminder', tech: 'WhatsApp API' },
        ];
      case 'real-estate-voice':
        return [
          { type: 'input', label: 'Inbound Call', sub: isAr ? 'مكالمة هاتفية' : 'Phone Inquiry', tech: 'Twilio' },
          { type: 'ai', label: 'Voice AI Agent', sub: isAr ? 'وكيل صوتي تفاعلي' : 'Call Handling', tech: 'Vapi + GPT-4' },
          { type: 'process', label: 'Qualification', sub: isAr ? 'تأهيل المشتري' : 'Lead Pitching', tech: 'n8n Engine' },
          { type: 'output', label: 'Calendar / CRM', sub: isAr ? 'حجز المعاينة' : 'Booking Viewing', tech: 'Google Calendar' },
        ];
      case 'content-engine':
        return [
          { type: 'input', label: 'Content Prompt', sub: isAr ? 'أمر تيليجرام' : 'Telegram Command', tech: 'Telegram API' },
          { type: 'ai', label: 'SEO & Visuals', sub: isAr ? 'إنشاء المقال والصور' : 'Article & Image', tech: 'GPT-4 + DALL-E 3' },
          { type: 'process', label: 'n8n Pipeline', sub: isAr ? 'المراجعة والتنسيق' : 'SEO Formatting', tech: 'n8n Workflow' },
          { type: 'output', label: 'Blogger Auto-Pub', sub: isAr ? 'نشر تلقائي' : 'Auto Publishing', tech: 'Blogger API' },
        ];
      case 'restaurant-bot':
        return [
          { type: 'input', label: 'Messenger Order', sub: isAr ? 'رسالة فيسبوك' : 'FB Messenger', tech: 'Messenger API' },
          { type: 'ai', label: 'AI Order Agent', sub: isAr ? 'مساعد القائمة والحجز' : 'Menu & Reservation', tech: 'OpenAI + n8n' },
          { type: 'process', label: 'Order Processing', sub: isAr ? 'تسجيل الطلب' : 'Airtable Logging', tech: 'Airtable' },
          { type: 'output', label: 'Kitchen / Staff', sub: isAr ? 'تأكيد وحجز' : 'Staff Escalation', tech: 'WhatsApp Alert' },
        ];
      case 'linkedin-automation':
        return [
          { type: 'input', label: 'LinkedIn Leads', sub: isAr ? 'بحث العملاء' : 'Prospecting', tech: 'LinkedIn API' },
          { type: 'ai', label: 'AI Personalization', sub: isAr ? 'رسائل مخصصة' : 'Smart Pitching', tech: 'OpenAI' },
          { type: 'process', label: 'Outreach Sequence', sub: isAr ? 'سلسلة المتابعة' : 'Follow-up Engine', tech: 'n8n Engine' },
          { type: 'output', label: 'CRM Pipeline', sub: isAr ? 'تأكيد العميل' : 'Deal Logging', tech: 'HubSpot / Airtable' },
        ];
      default:
        return [
          { type: 'input', label: 'Input Data', sub: 'Inquiry / Event', tech: 'API Trigger' },
          { type: 'ai', label: 'AI Agent', sub: 'Processing & Logic', tech: 'AI Model' },
          { type: 'process', label: 'Workflow', sub: 'Automation Steps', tech: 'n8n Engine' },
          { type: 'output', label: 'Business Outcome', sub: 'CRM / Notification', tech: 'Output API' },
        ];
    }
  };

  const steps = getWorkflowSteps();

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#061020] via-[#09152a] to-[#040a15] p-4 flex flex-col justify-between relative overflow-hidden select-none border border-white/5 rounded-xl">
      {/* Background Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.15) 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* Header Label */}
      <div className="flex items-center justify-between relative z-10 mb-2">
        <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-[var(--accent)] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          SYSTEM FLOW // {projectId.toUpperCase()}
        </span>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
          INPUT → AI → PROCESS → OUTPUT
        </span>
      </div>

      {/* Architecture Flow Visual */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10 my-auto items-center">
        {steps.map((step, idx) => {
          const colors = getNodeColor(step.type as any);
          const isLast = idx === steps.length - 1;

          return (
            <div key={idx} className="relative group">
              {/* Connector line for desktop */}
              {!isLast && (
                <div className="hidden md:block absolute top-1/2 -right-3.5 w-4 h-[2px] bg-white/10 -translate-y-1/2 z-0 overflow-hidden">
                  <div 
                    className="w-full h-full animate-pulse" 
                    style={{ 
                      background: `linear-gradient(90deg, ${colors.pulse}, transparent)`,
                      animationDuration: '1.5s' 
                    }} 
                  />
                </div>
              )}

              {/* Node Card */}
              <div 
                className="p-3 rounded-lg border transition-all duration-300 relative z-10 backdrop-blur-sm group-hover:scale-[1.02]"
                style={{ 
                  backgroundColor: colors.bg, 
                  borderColor: colors.border 
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider" style={{ color: colors.text }}>
                    0{idx + 1} {step.type.toUpperCase()}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.text }} />
                </div>
                <div className="font-sans font-bold text-xs text-white truncate mb-0.5">{step.label}</div>
                <div className="font-sans text-[10px] text-white/70 truncate">{step.sub}</div>
                <div className="mt-2 pt-1.5 border-t border-white/5 font-mono text-[9px] text-white/50 truncate flex items-center justify-between">
                  <span>Tech:</span>
                  <span className="text-white/80 font-medium">{step.tech}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Indicator */}
      <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-2 border-t border-white/5 relative z-10">
        <span>⚡ 100% Production Verified</span>
        <span>Lat: &lt;200ms</span>
      </div>
    </div>
  );
}
