import React from 'react';
import { useI18n } from '../i18n';

interface FeedbackButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  shortLabel?: string;
  loadingLabel?: string;
  shortLoadingLabel?: string;
  title?: string;
  muted?: boolean;
}

export const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  onClick,
  disabled = false,
  isLoading = false,
  label,
  shortLabel,
  loadingLabel,
  shortLoadingLabel,
  title,
  muted = false,
}) => {
  const { t } = useI18n();
  const resolvedLabel = label ?? t('actions.sendFeedback');
  const resolvedLoadingLabel = loadingLabel ?? t('actions.sending');
  const resolvedTitle = title ?? resolvedLabel;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 md:px-2.5 md:py-1 rounded-md text-xs font-medium transition-all ${
        muted
          ? 'opacity-50 cursor-not-allowed bg-accent/10 text-accent/50'
          : disabled
            ? 'opacity-50 cursor-not-allowed bg-muted text-muted-foreground'
            : 'bg-accent/15 text-accent hover:bg-accent/25 border border-accent/30'
      }`}
      title={resolvedTitle}
    >
      <svg className="w-4 h-4 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      {shortLabel ? (
        <>
          <span className="hidden md:inline lg:hidden">{isLoading ? (shortLoadingLabel ?? resolvedLoadingLabel) : shortLabel}</span>
          <span className="hidden lg:inline">{isLoading ? resolvedLoadingLabel : resolvedLabel}</span>
        </>
      ) : (
        <span className="hidden md:inline">{isLoading ? resolvedLoadingLabel : resolvedLabel}</span>
      )}
    </button>
  );
};

export interface ApproveButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  loadingLabel?: string;
  mobileLabel?: string;
  mobileLoadingLabel?: string;
  title?: string;
  dimmed?: boolean;
  muted?: boolean;
}

export const ApproveButton: React.FC<ApproveButtonProps> = ({
  onClick,
  disabled = false,
  isLoading = false,
  label,
  loadingLabel,
  mobileLabel = 'OK',
  mobileLoadingLabel = '...',
  title,
  dimmed = false,
  muted = false,
}) => {
  const { t } = useI18n();
  const resolvedLabel = label ?? t('actions.approve');
  const resolvedLoadingLabel = loadingLabel ?? t('actions.approving');

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-1 md:px-2.5 rounded-md text-xs font-medium transition-all ${
        muted
          ? 'opacity-40 cursor-not-allowed bg-muted text-muted-foreground'
          : disabled
            ? 'opacity-50 cursor-not-allowed bg-muted text-muted-foreground'
            : dimmed
              ? 'bg-success/50 text-success-foreground/70 hover:bg-success hover:text-success-foreground'
              : 'bg-success text-success-foreground hover:opacity-90'
      }`}
      title={title}
    >
      <span className="md:hidden">{isLoading ? mobileLoadingLabel : mobileLabel}</span>
      <span className="hidden md:inline">{isLoading ? resolvedLoadingLabel : resolvedLabel}</span>
    </button>
  );
};

interface ExitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  title?: string;
}

export const ExitButton: React.FC<ExitButtonProps> = ({
  onClick,
  disabled = false,
  isLoading = false,
  title,
}) => {
  const { t } = useI18n();

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
        disabled || isLoading
          ? 'opacity-50 cursor-not-allowed bg-muted text-muted-foreground'
          : 'bg-muted text-muted-foreground hover:bg-muted/80'
      }`}
      title={title ?? t('actions.close')}
    >
      <span className="md:hidden">{isLoading ? '...' : '✕'}</span>
      <span className="hidden md:inline">{isLoading ? t('actions.closing') : t('actions.close')}</span>
    </button>
  );
};
