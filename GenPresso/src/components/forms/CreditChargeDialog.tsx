import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ChevronRight, CreditCard, Wallet, Gift } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../contexts/LanguageContext";
import { VisuallyHidden } from "../ui/visually-hidden";
import { CloseButton } from "../ui/close-button";

interface CreditPackage {
  id: string;
  amount: number;
  price: number;
  popular?: boolean;
  bonus?: number;
}

const creditPackages: CreditPackage[] = [
  { id: 'small', amount: 100, price: 9900 },
  { id: 'medium', amount: 500, price: 39900, bonus: 50, popular: true },
  { id: 'large', amount: 1000, price: 69900, bonus: 200 },
  { id: 'premium', amount: 2000, price: 119900, bonus: 500 }
];

interface CreditChargeDialogProps {
  children: React.ReactNode;
  currentCredit?: number;
  onCreditUpdate?: (newCredit: number) => void;
}

export function CreditChargeDialog({ 
  children, 
  currentCredit = 100, 
  onCreditUpdate 
}: CreditChargeDialogProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('medium');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const handlePurchase = async () => {
    const pkg = creditPackages.find(p => p.id === selectedPackage);
    if (!pkg) return;

    setIsProcessing(true);
    
    // 결제 프로세스 시뮬레이션
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newCreditAmount = pkg.amount + (pkg.bonus || 0);
      const newTotal = currentCredit + newCreditAmount;
      
      // 부모 컴포넌트에 크레딧 업데이트 알림
      onCreditUpdate?.(newTotal);
      
      toast.success(t('credit.chargeSuccess', { amount: newCreditAmount }));
      setIsOpen(false);
    } catch (error) {
      toast.error(t('credit.chargeError'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent 
        className="max-w-2xl mx-auto max-h-[85vh] flex flex-col p-0 gap-0 border-[0.5px] overflow-hidden [&>button]:hidden"
        style={{
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--glass-backdrop))',
          WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
          borderColor: 'var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <VisuallyHidden>
          <DialogTitle>
            {t('credit.chargeDialogTitle')}
          </DialogTitle>
          <DialogDescription>
            {t('credit.chargeDialogDescription')}
          </DialogDescription>
        </VisuallyHidden>

        <div className="absolute right-2.5 top-2.5 z-50">
          <CloseButton onClick={() => setIsOpen(false)} size="sm" />
        </div>

        {/* Custom Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">{t('credit.chargeDialogTitle')}</h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col flex-1 overflow-y-auto p-6 gap-6">
          {/* 현재 크레딧 표시 */}
          <div className="bg-muted/30 rounded-xl p-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('credit.currentHolding')}</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-sm" />
                <span className="font-semibold text-lg">{currentCredit.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 크레딧 패키지 선택 */}
          <div className="space-y-3 shrink-0">
            <h3 className="font-medium">{t('credit.selectPackage')}</h3>
            <div className="grid gap-2">
              {creditPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedPackage === pkg.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  {pkg.popular && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 left-4 bg-primary text-primary-foreground text-xs"
                    >
                      {t('credit.popular')}
                    </Badge>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 bg-primary rounded-sm" />
                        <span className="font-semibold">{pkg.amount.toLocaleString()}</span>
                        {pkg.bonus && (
                          <span className="text-xs text-primary">+ {pkg.bonus} {t('credit.bonus')}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t('credit.total')} {(pkg.amount + (pkg.bonus || 0)).toLocaleString()} {t('credit.unit')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₩{formatPrice(pkg.price)}</div>
                      <div className="text-xs text-muted-foreground">
                        ≈ ₩{Math.round(pkg.price / pkg.amount)}/{t('credit.unit')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 결제 방법 */}
          <div className="space-y-3 shrink-0">
            <h3 className="font-medium">{t('credit.paymentMethod')}</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 bg-card hover:bg-muted/50"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {t('credit.card')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 bg-card hover:bg-muted/50"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {t('credit.easyPay')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 bg-card hover:bg-muted/50"
              >
                <Gift className="h-4 w-4 mr-2" />
                {t('credit.coupon')}
              </Button>
            </div>
          </div>

          {/* 구매 버튼 */}
          <Button 
            className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
            onClick={handlePurchase}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {t('credit.processing')}
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span>
                  {creditPackages.find(p => p.id === selectedPackage)?.amount.toLocaleString()} {t('credit.purchase')}
                </span>
                <div className="flex items-center gap-1">
                  <span>₩{formatPrice(creditPackages.find(p => p.id === selectedPackage)?.price || 0)}</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            )}
          </Button>

          {/* 이용약관 */}
          <p className="text-xs text-muted-foreground text-center pb-2">
            {t('credit.purchaseAgreement')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
