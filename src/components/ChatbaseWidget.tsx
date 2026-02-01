import { useEffect } from 'react';

declare global {
  interface Window {
    embeddedChatbotConfig?: {
      chatbotId: string;
      domain: string;
    };
  }
}

export const ChatbaseWidget = () => {
  useEffect(() => {
    // Vérifier si le script n'est pas déjà chargé
    if (document.getElementById('chatbase-script')) {
      return;
    }

    // Configuration du chatbot
    window.embeddedChatbotConfig = {
      chatbotId: "GEn5wsmn2hD3JWOOREvcf",
      domain: "www.chatbase.co"
    };

    // Créer et charger le script
    const script = document.createElement('script');
    script.id = 'chatbase-script';
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('chatbotId', 'GEn5wsmn2hD3JWOOREvcf');
    script.setAttribute('domain', 'www.chatbase.co');

    document.body.appendChild(script);

    return () => {
      // Cleanup optionnel si nécessaire
    };
  }, []);

  return null;
};
