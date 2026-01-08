import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { useLanguage } from "../../contexts/LanguageContext";
import { Check } from "lucide-react";

export function ChangePlanDialog({ 
  open, 
  onOpenChange,
  currentPlanId
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  currentPlanId?: string;
}) {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[1100px] p-0 overflow-hidden gap-0 border"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
          backdropFilter: 'blur(var(--glass-backdrop))',
          WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
        }}
      >
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between px-6 py-4 border-b mb-4 -mx-4 -mt-4 shrink-0" style={{ borderColor: 'var(--glass-border)' }}>
            <div className="flex flex-col gap-1">
              <DialogTitle className="text-xl font-bold text-foreground">{t('subscription.changePlanTitle')}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {t('subscription.changePlanDescription')}
              </DialogDescription>
            </div>
          </div>

          {(() => {
            const PLANS_DATA = [
              { id: 'free_monthly', name: 'Free', price: '0', period: '/ 월', type: 'monthly' },
              { id: 'lite_monthly', name: 'Lite', price: '29,000', period: '/ 월', type: 'monthly' },
              { id: 'basic_monthly', name: 'Basic', price: '49,000', period: '/ 월', type: 'monthly' },
              { id: 'pro_monthly', name: 'Pro', price: '149,000', period: '/ 월', type: 'monthly' },
              { id: 'free_yearly', name: 'Free', price: '0', period: '/ 월', type: 'yearly' },
              { id: 'lite_yearly', name: 'Lite', price: '26,000', period: '/ 월', type: 'yearly' },
              { id: 'basic_yearly', name: 'Basic', price: '39,000', period: '/ 월', type: 'yearly' },
              { id: 'pro_yearly', name: 'Pro', price: '89,000', period: '/ 월', type: 'yearly' },
            ];

            const renderPlanCard = (plan: typeof PLANS_DATA[0]) => {
              const isSelected = selectedPlan === plan.id;
              // Simple check for current plan - in real app, might need more robust matching (e.g. ignoring cycle)
              // Assuming currentPlanId matches exactly one of the IDs
              const isCurrent = currentPlanId === plan.id; 
              
              const planKey = plan.name.toLowerCase();
              
              // Features based on plan name
              const features = [
                t(`subscription.planFeatures.${planKey}.item1`),
                t(`subscription.planFeatures.${planKey}.item2`),
                t(`subscription.planFeatures.${planKey}.item3`),
              ];
              
              const note = planKey === 'free' ? t(`subscription.planFeatures.free.note`) : undefined;
              const credit = planKey !== 'free' ? t(`subscription.planFeatures.${planKey}.credit`) : undefined;

              const commonFeatures = planKey === 'pro' ? [
                t('subscription.commonFeatures.proCombined'),
                t('subscription.commonFeatures.grouping'),
                t('subscription.commonFeatures.unlimitedRef'),
                t('subscription.commonFeatures.agentCollab'),
                t('subscription.commonFeatures.fastResponse'),
              ] : [
                t('subscription.commonFeatures.bgRemoval'),
                t('subscription.commonFeatures.elementSelect'),
                t('subscription.commonFeatures.grouping'),
                t('subscription.commonFeatures.refUpload'),
              ];

              return (
                <div
                  key={plan.id}
                  onClick={() => !isCurrent && setSelectedPlan(plan.id)}
                  className={cn(
                    "relative flex flex-col w-full text-left transition-all rounded-2xl border overflow-hidden group h-full",
                    !isCurrent ? "cursor-pointer hover:border-primary/50 hover:shadow-lg" : "cursor-default opacity-100",
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : isCurrent
                        ? "border-primary/50 bg-secondary/10" // Current plan style
                        : "border-border bg-background/50"
                  )}
                  style={{
                    backgroundColor: isSelected ? 'rgba(79, 168, 216, 0.05)' : 'var(--glass-bg)',
                  }}
                >
                  {/* Header */}
                  <div className="px-4 pt-4 pb-2 flex flex-col items-center">
                    <h4 className={cn("text-lg font-bold mb-2", planKey === 'free' ? "text-foreground" : "text-primary")}>
                      {plan.name}
                    </h4>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-xl font-bold">₩{plan.price}</span>
                      <span className="text-xs text-muted-foreground">{plan.period}</span>
                    </div>
                    {credit && (
                      <span className="text-xs font-medium text-primary mb-2">
                        {credit}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="p-4 pt-2 flex-1 flex flex-col">
                    <ul className="space-y-2 mb-2">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div className="mt-1 w-1 h-1 rounded-full bg-primary shrink-0" />
                          <span className="leading-tight tracking-tight break-keep">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {note && (
                      <div className="flex items-start gap-2 mb-4 text-xs text-muted-foreground">
                        <div className="mt-1 w-1 h-1 rounded-full bg-primary shrink-0" />
                        <span className="leading-tight tracking-tight break-keep">{note}</span>
                      </div>
                    )}

                    {/* Gray Box for common features */}
                    <div className="mt-auto bg-muted/50 rounded-lg p-3 space-y-1.5">
                      {commonFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <Check className="w-3 h-3 text-primary shrink-0" />
                          <span className="leading-tight truncate">{feature}</span>
                        </li>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <div className="p-4 pt-0">
                    <Button 
                      className={cn(
                        "w-full h-9 text-xs font-semibold rounded-lg",
                        isCurrent 
                          ? "bg-muted text-muted-foreground hover:bg-muted" 
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                      disabled={isCurrent}
                      variant={isCurrent ? "secondary" : "default"}
                    >
                      {isCurrent ? t('subscription.currentlySubscribing') : t('subscription.selectPlanButton')}
                    </Button>
                  </div>
                </div>
              );
            };

            return (
              <div className="w-full mb-4">
                <input type="radio" name="cycle" id="cycle-monthly" className="peer/monthly hidden" defaultChecked />
                <input type="radio" name="cycle" id="cycle-yearly" className="peer/yearly hidden" />

                <div className="flex justify-center mb-4 peer-checked/monthly:[&_.toggle-slider]:left-1 peer-checked/yearly:[&_.toggle-slider]:left-1/2 peer-checked/monthly:[&_.label-monthly]:text-primary-foreground peer-checked/yearly:[&_.label-yearly]:text-primary-foreground peer-checked/monthly:[&_.label-monthly]:font-bold peer-checked/yearly:[&_.label-yearly]:font-bold">
                  <div className="bg-muted p-1 rounded-full flex relative w-[160px] h-10 shadow-inner border border-border/50">
                    <div className="toggle-slider absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full transition-all duration-300 shadow-sm" />
                    <label 
                      htmlFor="cycle-monthly" 
                      className="label-monthly flex-1 z-10 flex items-center justify-center cursor-pointer text-sm font-medium transition-all text-muted-foreground hover:text-foreground/80"
                    >
                      {t('subscription.monthly')}
                    </label>
                    <label 
                      htmlFor="cycle-yearly" 
                      className="label-yearly flex-1 z-10 flex items-center justify-center cursor-pointer text-sm font-medium transition-all text-muted-foreground hover:text-foreground/80"
                    >
                      {t('subscription.yearly')}
                    </label>
                  </div>
                </div>

                {/* Monthly Grid */}
                <div className="hidden peer-checked/monthly:grid grid-cols-4 gap-3 px-2">
                  {PLANS_DATA.filter(p => p.type === 'monthly').map(renderPlanCard)}
                </div>

                {/* Yearly Grid */}
                <div className="hidden peer-checked/yearly:grid grid-cols-4 gap-3 px-2">
                  {PLANS_DATA.filter(p => p.type === 'yearly').map(renderPlanCard)}
                </div>
              </div>
            );
          })()}

          <div className="mb-4 mx-2">
            <h5 className="font-semibold text-xs mb-2 text-muted-foreground">* {t('subscription.changePlanNoticeTitle')}</h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('subscription.changePlanNotice')}
            </p>
          </div>
        </div>

        <div className="py-3 px-6 bg-muted/20 border-t flex items-center justify-end gap-2">
          <Button 
            variant="ghost" 
            className="h-9 text-muted-foreground hover:text-destructive"
            onClick={() => onOpenChange(false)}
          >
            {t('subscription.cancelSubscription')}
          </Button>
          <Button 
            className="h-9 font-semibold" 
            size="sm"
            disabled={!selectedPlan}
            onClick={() => {
              // Handle plan change logic here
              onOpenChange(false);
            }}
          >
            {t('subscription.changeToSelectedPlan')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
