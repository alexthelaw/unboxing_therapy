import { JSX } from 'preact';
import { StateUpdater, useEffect, useState } from 'preact/compat';

import { TOKEN } from '../../constants/LocalStorage';
import { supportedQuestTags } from '../../layout/Main';

type UseButtonDataProps = {
  claimElement: JSX.Element;
};

const texts: Record<string, string> = {
  default: 'Read an article. Get Rewards',
  unclaimed: 'You have unclaimed rewards',
};

const getUserQuestActivityReq = async (setText: StateUpdater<string>) => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    const apiUrl = process.env.BACKEND_API_URL || '';
    const getUserQuestActivity = await import('../../services/queries/getUserQuestActivity');
    const request = {
      requestData: getUserQuestActivity.getUserQuestActivity(),
    };
    try {
      const data = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.requestData),
      });
      const userActivity = await data.json();
      if (userActivity?.data) {
        const widgetQuestCategories = Object.values(userActivity?.data.widgetUserQuestsActivity);
        widgetQuestCategories.forEach(c => {
          const quest = Object.values(c as typeof Object);
          quest.forEach(q => {
            if (q.status === 'STARTED') {
              setText(texts.unclaimed);
            }
          });
        });
        console.log(widgetQuestCategories);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

export const useButtonData = ({ claimElement }: UseButtonDataProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [text, setText] = useState<string | JSX.Element>(texts.default);

  const readMore = document.getElementsByClassName('space-page-content-tags')[0];

  useEffect(() => {
    (async () => getUserQuestActivityReq(setText))();

    const height = readMore ? readMore.getBoundingClientRect()?.top : 0;

    const scrollProgressBar = () => {
      const scrollDistance = readMore
        ? readMore.getBoundingClientRect()?.top - document.documentElement.clientHeight
        : 0;
      const progressPercentage = (scrollDistance / height) * 100;

      const val = progressPercentage < 0 ? 100 : Math.min(100 - Math.floor(progressPercentage), 100);

      if (val === 100) {
        setText(claimElement);
      }

      setProgress(val);
    };

    const tags = readMore?.innerText?.split(',') || [];
    tags
      .map(t => t.toLowerCase())
      .forEach(t => {
        if (supportedQuestTags.includes(t)) {
          window.addEventListener('scroll', scrollProgressBar);
        }
      });

    return () => window.removeEventListener('scroll', scrollProgressBar);
  }, []);

  return [progress, text];
};
