import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Download, X } from "lucide-react";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { useLanguage } from "../../../contexts/LanguageContext";
import { GlassCard } from "../components/GlassCard";
import { 
  GlassTable, 
  GlassTableHeader, 
  GlassTableBody, 
  GlassTableRow, 
  GlassTableHead, 
  GlassTableCell,
  GlassBadge
} from "../../ui/glass-table";
import { ChangePlanDialog } from "../ChangePlanDialog";
import { GLASS_CARD_STYLE } from "../data";

export function SubscriptionTab() {
  const [activeSubTab, setActiveSubTab] = useState<"subscription" | "payment">("subscription");
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 px-12 pt-4">
        <div className="mb-6">
          <h3 className="font-semibold mb-1">{t('settings.subscription')}</h3>
          <p className="text-xs text-muted-foreground">{t('settings.subscriptionDescription')}</p>
        </div>

        {/* 탭 시스템 */}
        <div className="flex gap-4 mb-6 border-b" style={{ borderColor: 'var(--glass-border)' }}>
          <button
            onClick={() => setActiveSubTab("subscription")}
            className={`relative pb-2 px-1 transition-colors ${
              activeSubTab === "subscription"
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('settings.subscriptionManage')}
            {activeSubTab === "subscription" && (
              <motion.div
                layoutId="activeSubTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveSubTab("payment")}
            className={`relative pb-2 px-1 transition-colors ${
              activeSubTab === "payment"
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('settings.paymentHistory')}
            {activeSubTab === "payment" && (
              <motion.div
                layoutId="activeSubTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 relative">
        {activeSubTab === "subscription" ? (
          <SubscriptionContent onGoToPayment={() => setActiveSubTab("payment")} />
        ) : (
          <PaymentHistoryTab onBack={() => setActiveSubTab("subscription")} />
        )}
      </div>
    </div>
  );
}

function SubscriptionContent({ onGoToPayment }: { onGoToPayment: () => void }) {
  const { t } = useLanguage();
  const [showChangePlanDialog, setShowChangePlanDialog] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [couponCode, setCouponCode] = useState("");
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string } | null>(null);

  const handleRegisterCoupon = () => {
    // Mock logic: "ERROR" or empty triggers error, otherwise success
    if (!couponCode.trim() || couponCode.toUpperCase() === "ERROR") {
      setAlert({
        show: true,
        type: 'error',
        message: t('subscription.couponError')
      });
    } else {
      setAlert({
        show: true,
        type: 'success',
        message: t('subscription.couponSuccess')
      });
      setCouponCode("");
    }
  };
  
  const CREDIT_OPTIONS = [300, 500, 1000, 2000, 3000];

  return (
    <div className="h-full overflow-y-auto px-12 py-4 space-y-6">
      {alert?.show && (
        <CouponAlert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)} 
        />
      )}
      {/* 현재 구독 상태 */}
      <div>
        <div className="mb-8">
          <div className="p-6 rounded-2xl bg-muted/30">
            <h3 className="font-semibold mb-1">{t('subscription.registerCoupon')}</h3>
            <p className="text-xs text-muted-foreground mb-4">{t('subscription.registerCouponDescription')}</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder={t('subscription.couponPlaceholder')}
                className="flex h-10 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button onClick={handleRegisterCoupon}>{t('workspace.register')}</Button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">{t('subscription.status')}</h3>
          <p className="text-xs text-muted-foreground">{t('settings.currentSubscriptionStatusDescription')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard className="flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-muted-foreground">{t('subscription.currentPlan')}</p>
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-medium">Active</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-primary">Free</h4>
              <div className="space-y-1">
                <p className="text-lg font-semibold">₩0 <span className="text-sm text-muted-foreground font-normal">/ {t('common.month')}</span></p>
                <p className="text-xs text-muted-foreground">{t('subscription.nextBillingDate')}: -</p>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full h-9" onClick={() => setShowChangePlanDialog(true)}>{t('subscription.changePlan')}</Button>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-4">{t('subscription.paymentInfo')}</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t('subscription.paymentMethod')}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Hyundai Card (5322)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t('workspace.status')}</span>
                  <span className="text-sm text-green-500 font-medium">{t('workspace.active')}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button variant="outline" className="flex-1 h-9">{t('subscription.managePaymentMethod')}</Button>
              <Button variant="secondary" className="flex-1 h-9" onClick={onGoToPayment}>{t('common.viewDetails')}</Button>
            </div>
          </GlassCard>
        </div>
      </div>

      <Separator />

      {/* 구독 안내 */}
      <div 
        className="px-6 py-4 rounded-2xl border-[0.5px] border-solid"
        style={GLASS_CARD_STYLE}
      >
        <h4 className="font-semibold mb-2 text-sm">{t('settings.subscriptionGuide')}</h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• {t('settings.subscriptionGuideAutoRenewal')}</li>
          <li>• {t('settings.subscriptionGuideCancellation')}</li>
          <li>• {t('settings.subscriptionGuidePlanChange')}</li>
        </ul>
      </div>

      <Separator />

      {/* 구독 플랜 선택 */}
      {/* 요금제 선택 섹션 */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
           <h3 className="text-2xl font-bold">{t('subscription.selectPlan')}</h3>
           <p className="text-muted-foreground">
             {t('subscription.selectPlanDescription')}<br/>
             {t('subscription.yearlyDiscountNotice', { percent: 40 })}
           </p>
           
           {/* Toggle */}
           <div className="inline-flex items-center p-1 bg-muted rounded-full">
             <button 
               onClick={() => setBillingCycle('monthly')}
               className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'bg-primary shadow text-primary-foreground' : 'text-muted-foreground'}`}
             >
               {t('subscription.monthly')}
             </button>
             <button 
               onClick={() => setBillingCycle('yearly')}
               className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === 'yearly' ? 'bg-primary shadow text-primary-foreground' : 'text-muted-foreground'}`}
             >
               {t('subscription.yearly')}
             </button>
           </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(() => {
             const UPDATED_PLANS = [
               {
                 id: "Free",
                 name: "Free",
                 priceMonthly: 0,
                 priceYearly: 0,
                 credits: "500",
                 creditNote: "체험용",
                 features: [
                   "Nano Banana로 이미지 62개 생성 가능",
                   "Nano Banana 2로 이미지 20개 생성 가능",
                   "Veo 3.1 fast로 비디오 2개 생성 가능",
                   "이미지 배경 제거",
                   "이미지 내 특정 요소 지정",
                   "그룹화 및 관리",
                   "레퍼런스 이미지 업로드"
                 ],
                 highlightTitle: false,
                 borderHighlight: false,
                 discount: null
               },
               {
                 id: "Lite",
                 name: "Lite",
                 priceMonthly: 29000,
                 priceYearly: 26000,
                 credits: "2,000",
                 creditNote: "월별",
                 features: [
                   "Nano Banana로 이미지 250개 생성 가능",
                   "Nano Banana 2로 이미지 80개 생성 가능",
                   "Veo 3.1 fast로 비디오 9개 생성 가능",
                   "이미지 배경 제거",
                   "이미지 내 특정 요소 지정",
                   "그룹화 및 관리",
                   "레퍼런스 이미지 업로드",
                   "*vat 포함"
                 ],
                 highlightTitle: false,
                 borderHighlight: false,
                 discount: "10%"
               },
               {
                 id: "Basic",
                 name: "Basic",
                 priceMonthly: 49000,
                 priceYearly: 39000,
                 credits: "3,500",
                 creditNote: "월별",
                 features: [
                   "Nano Banana로 이미지 437개 생성 가능",
                   "Nano Banana 2로 이미지 145개 생성 가능",
                   "Veo 3.1 fast로 비디오 16개 생성 가능",
                   "이미지 배경 제거",
                   "이미지 내 특정 요소 지정",
                   "그룹화 및 관리",
                   "레퍼런스 이미지 업로드",
                   "*vat 포함"
                 ],
                 highlightTitle: true,
                 borderHighlight: true,
                 discount: "20%"
               },
               {
                 id: "Pro",
                 name: "Pro",
                 priceMonthly: 149000,
                 priceYearly: 89000,
                 credits: "12,000",
                 creditNote: "월별",
                 features: [
                   "Nano Banana로 이미지 1500개 생성 가능",
                   "Nano Banana 2로 이미지 500개 생성 가능",
                   "Veo 3.1 fast로 비디오 57개 생성 가능",
                   "이미지 배경 제거",
                   "이미지 내 특정 요소 지정",
                   "그룹화 및 관리",
                   "레퍼런스 이미지, 영상 무제한 업로드",
                   "에이전트와 무제한 대화 및 공동작업",
                   "빠른 서비스 응대",
                   "*vat 포함"
                 ],
                 highlightTitle: true,
                 borderHighlight: false,
                 discount: "40%"
               }
             ];

             return UPDATED_PLANS.map((plan) => {
                const price = plan.id === 'Free' 
                  ? 0 
                  : billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
                
                return (
                 <GlassCard key={plan.id} className={`relative overflow-visible flex flex-col p-4 ${plan.borderHighlight ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
                   <div className="mb-4">
                     <div className="flex items-center gap-2">
                       <h4 className={`text-lg font-bold ${plan.id !== 'Free' ? 'text-primary' : ''}`}>{plan.name}</h4>
                       {billingCycle === 'yearly' && plan.discount && (
                         <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                           {plan.discount} 할인
                         </span>
                       )}
                     </div>
                     <div className="mt-2 flex items-baseline gap-1">
                       <span className="text-2xl font-bold whitespace-nowrap tracking-tight">
                         {price?.toLocaleString()}{t('common.won')}
                       </span>
                       {plan.id !== 'Free' && <span className="text-xs text-muted-foreground whitespace-nowrap">{t('settings.perMonth')}</span>}
                     </div>
                     <div className="mt-2">
                       <p className="text-sm font-medium">{t('subscription.providedCredits')} : {plan.credits}</p>
                       <p className="text-xs text-muted-foreground min-h-[20px]">{plan.creditNote ? `(${plan.creditNote})` : "\u00A0"}</p>
                     </div>
                   </div>
                   <Separator className="my-4 opacity-50" />
                   <div className="flex-1 mb-6">
                      <ul className="space-y-2 text-xs">
                         {plan.features.map((feature, i) => (
                           <React.Fragment key={i}>
                             {feature === "이미지 배경 제거" && <Separator className="my-3 opacity-50" />}
                             <li className={`text-muted-foreground break-keep tracking-tight ${feature.startsWith("Nano") || feature.startsWith("Veo") ? 'flex items-start gap-2 text-left' : 'text-center block'}`}>
                               {(feature.startsWith("Nano") || feature.startsWith("Veo")) && <span className="text-primary mt-0.5 text-[10px]">●</span>}
                               {feature}
                             </li>
                           </React.Fragment>
                         ))}
                      </ul>
                   </div>
                   <Button className={`w-full ${plan.borderHighlight ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`} variant={plan.borderHighlight ? "default" : "outline"}>
                     {t('subscription.usePlan', { plan: plan.name })}
                   </Button>
                 </GlassCard>
                );
             });
          })()}
        </div>



        <Separator className="my-8" />

        {/* Enterprise */}
         <GlassCard className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{t('subscription.enterpriseInquiry')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('subscription.enterpriseDescription1')}<br/>
                {t('subscription.enterpriseDescription2')}
              </p>
            </div>
            <Button size="lg" className="shrink-0">{t('subscription.contactSales')} &rarr;</Button>
         </GlassCard>
      </div>

      <ChangePlanDialog 
        open={showChangePlanDialog} 
        onOpenChange={setShowChangePlanDialog} 
        currentPlanId="free_monthly"
      />

      {/* 알아두세요 */}
      <div 
        className="px-6 py-4 rounded-2xl border-[0.5px] border-solid"
        style={GLASS_CARD_STYLE}
      >
        <h4 className="font-semibold mb-2 text-sm">{t('settings.subscriptionNotice')}</h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• {t('settings.subscriptionNoticeTax')}</li>
          <li>• {t('settings.subscriptionNoticeCancellation')}</li>
          <li>• {t('settings.subscriptionNoticePlanChange')}</li>
          <li>• {t('settings.subscriptionNoticePayment')}</li>
        </ul>
      </div>
    </div>
  );
}

function PaymentHistoryTab({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  
  // Mock data for payment history
  const history = [
    { date: "2025. 10. 27", desc: "Pro Plan (Monthly)", amount: "19,900", status: "success" as const },
    { date: "2025. 09. 27", desc: "Pro Plan (Monthly)", amount: "19,900", status: "success" as const },
    { date: "2025. 08. 27", desc: "Pro Plan (Monthly)", amount: "19,900", status: "success" as const },
  ];
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-12 py-4 space-y-6">
        <div>
          <div className="mb-4">
            <h3 className="font-semibold mb-1">{t('settings.paymentHistory')}</h3>
            <p className="text-xs text-muted-foreground">{t('settings.paymentHistoryDescription')}</p>
          </div>

          <GlassTable>
            <GlassTableHeader>
              <GlassTableRow className="hover:bg-transparent">
                <GlassTableHead className="w-[160px]">{t('subscription.paymentDate')}</GlassTableHead>
                <GlassTableHead>{t('subscription.paymentDesc')}</GlassTableHead>
                <GlassTableHead>{t('subscription.paymentAmount')}</GlassTableHead>
                <GlassTableHead>{t('workspace.status')}</GlassTableHead>
                <GlassTableHead className="text-right">{t('subscription.invoice')}</GlassTableHead>
              </GlassTableRow>
            </GlassTableHeader>
            <GlassTableBody>
              {history.map((item, i) => (
                <GlassTableRow key={i}>
                  <GlassTableCell className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.date}
                  </GlassTableCell>
                  <GlassTableCell className="font-medium text-foreground">
                    {item.desc}
                  </GlassTableCell>
                  <GlassTableCell className="font-semibold">
                    {item.amount}{t('common.won')}
                  </GlassTableCell>
                  <GlassTableCell>
                    <GlassBadge variant={item.status === "success" ? "success" : "default"}>
                      {t('workspace.active')}
                    </GlassBadge>
                  </GlassTableCell>
                  <GlassTableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
                      <Download className="w-4 h-4" />
                    </Button>
                  </GlassTableCell>
                </GlassTableRow>
              ))}
            </GlassTableBody>
          </GlassTable>
        </div>
      </div>
      
      <div 
        className="shrink-0 z-10 flex items-center justify-end gap-2 py-4 px-6 border-t rounded-b-2xl relative" 
        style={{ 
          borderColor: 'var(--glass-border)',
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
        }}
      >
         <div className="absolute inset-0 bg-background/50 -z-10 rounded-b-2xl" />
         <Button variant="destructive">
           {t('subscription.cancelSubscription')}
         </Button>
      </div>
    </div>
  );
}

function CouponAlert({ 
  type, 
  message, 
  onClose 
}: { 
  type: 'success' | 'error'; 
  message: string; 
  onClose: () => void 
}) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-background/80 backdrop-blur-md text-center max-w-sm w-full border border-border animate-in fade-in zoom-in-95 duration-200">
      <button 
        className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground transition-colors" 
        onClick={onClose}
      >
        <X className="w-4 h-4" />
      </button>
      <p className="text-sm font-medium whitespace-pre-line leading-relaxed">
        {message}
      </p>
    </div>
  );
}