import React from 'react';

// ReactContext to simplify access of StripeOnramp object
const CryptoElementsContext = React.createContext<any>(null);
CryptoElementsContext.displayName = 'CryptoElementsContext';

export const CryptoElements: React.FC<{ stripeOnramp: Promise<any>; children: React.ReactNode }> = ({
  stripeOnramp,
  children,
}) => {
  const [ctx, setContext] = React.useState<{ onramp: any | null }>({ onramp: null });

  React.useEffect(() => {
    let isMounted = true;

    Promise.resolve(stripeOnramp).then((onramp) => {
      if (onramp && isMounted) {
        setContext((ctx) => (ctx.onramp ? ctx : { onramp }));
      }
    });

    return () => {
      isMounted = false;
    };
  }, [stripeOnramp]);

  return (
    <CryptoElementsContext.Provider value={ctx}>
      {children}
    </CryptoElementsContext.Provider>
  );
};

export const useStripeOnramp = () => {
  const context = React.useContext(CryptoElementsContext);
  return context?.onramp;
};

const useOnrampSessionListener = (type: any, session: any, callback: any) => {
  React.useEffect(() => {
    if (session && callback) {
      const listener = (e: { payload: any }) => callback(e.payload);
      session.addEventListener(type, listener);
      return () => {
        session.removeEventListener(type, listener);
      };
    }
    return () => {};
  }, [session, callback, type]);
};

export const OnrampElement: React.FC<any> = ({
  clientSecret,
  appearance,
  onReady,
  onChange,
  ...props
}) => {
  const stripeOnramp = useStripeOnramp();
  const onrampElementRef = React.useRef<HTMLDivElement>(null);
  const [session, setSession] = React.useState<any | null>(null);

  const appearanceJSON = JSON.stringify(appearance);
  React.useEffect(() => {
    const containerRef = onrampElementRef.current;
    if (containerRef) {
      containerRef.innerHTML = '';

      if (clientSecret && stripeOnramp) {
        setSession(
          stripeOnramp
            .createSession({
              clientSecret,
              appearance: appearanceJSON ? JSON.parse(appearanceJSON) : {},
            })
            .mount(containerRef)
        );
      }
    }
  }, [appearanceJSON, clientSecret, stripeOnramp]);

  useOnrampSessionListener('onramp_ui_loaded', session, onReady);
  useOnrampSessionListener('onramp_session_updated', session, onChange);

  return <div {...props} ref={onrampElementRef}></div>;
};
