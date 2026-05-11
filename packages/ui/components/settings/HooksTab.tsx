import React, { useEffect, useState } from 'react';
import { FAVICON_SVG } from '@plannotator/shared/favicon';
import { useI18n } from '../../i18n';

interface HooksStatus {
  pfmReminder: { enabled: boolean };
  improvementHook: {
    present: boolean;
    filePath: string | null;
    fileSize: number | null;
    content: string | null;
  };
  composedLength: number | null;
}

export const HooksTab: React.FC = () => {
  const { t } = useI18n();
  const [status, setStatus] = useState<HooksStatus | null>(null);
  const [pfmEnabled, setPfmEnabled] = useState(false);
  const [hookExpanded, setHookExpanded] = useState(false);

  useEffect(() => {
    fetch('/api/hooks/status')
      .then(r => r.json())
      .then((data: HooksStatus) => {
        setStatus(data);
        setPfmEnabled(data.pfmReminder.enabled);
      })
      .catch(() => {});
  }, []);

  const togglePfm = async () => {
    const next = !pfmEnabled;
    setPfmEnabled(next);
    await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pfmReminder: next }),
    }).catch(() => setPfmEnabled(!next));
  };

  if (!status) {
    return <div className="text-sm text-muted-foreground py-4">{t('hooks.loading')}</div>;
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        {t('hooks.intro')}
      </p>

      {/* PFM Reminder Card */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 flex-shrink-0 rounded-md overflow-hidden"
            dangerouslySetInnerHTML={{ __html: FAVICON_SVG }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground">{t('hooks.plannotatorFlavoredMarkdown')}</h3>
              <button
                onClick={togglePfm}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                  pfmEnabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition-transform ${
                    pfmEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {t('hooks.pfmDescription')}{' '}
              <strong>{t('hooks.pfmNoExtraTokens')}</strong> — {t('hooks.pfmSuffix')}
            </p>
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                pfmEnabled
                  ? 'bg-primary/15 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${pfmEnabled ? 'bg-primary' : 'bg-muted-foreground/50'}`} />
                {pfmEnabled ? t('hooks.enabled') : t('hooks.disabled')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compound Improvement Hook Card */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 flex-shrink-0 rounded-md overflow-hidden"
            dangerouslySetInnerHTML={{ __html: FAVICON_SVG }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground">{t('hooks.improvementHook')}</h3>
              <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                status.improvementHook.present
                  ? 'bg-primary/15 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.improvementHook.present ? 'bg-primary' : 'bg-muted-foreground/50'}`} />
                {status.improvementHook.present ? t('hooks.active') : t('hooks.notFound')}
              </span>
            </div>

            {status.improvementHook.present ? (
              <>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {t('hooks.improvementDescription')}
                  {status.improvementHook.fileSize != null && (
                    <span className="text-muted-foreground/70"> · {(status.improvementHook.fileSize / 1024).toFixed(1)}KB</span>
                  )}
                </p>
                <button
                  onClick={() => setHookExpanded(!hookExpanded)}
                  className="text-xs text-primary hover:text-primary/80 mt-1.5 transition-colors"
                >
                  {hookExpanded ? `▾ ${t('hooks.hideContent')}` : `▸ ${t('hooks.showContent')}`}
                </button>
                {hookExpanded && status.improvementHook.content && (
                  <pre className="mt-2 p-3 rounded-md bg-muted/50 border border-border text-[11px] text-foreground/80 overflow-auto max-h-64 whitespace-pre-wrap font-mono leading-relaxed">
                    {status.improvementHook.content}
                  </pre>
                )}
              </>
            ) : (
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {t('hooks.notFoundDescription')}{' '}
                <a
                  href="https://plannotator.ai/blog/continuously-improve-claude-code-plans/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline underline-offset-2"
                >
                  {t('hooks.learnMore')}
                </a>{' '}
                {t('hooks.orRun')} <code className="text-[10px] bg-muted px-1 py-0.5 rounded">/plannotator-compound</code> {t('hooks.toGenerateOne')}
              </p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
