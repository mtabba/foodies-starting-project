import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
import classes from './page.module.css';

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealsSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: `${meal.title}Discover Delicious Meals - Foodies Community | Explore, Share & Cook`,
    description: `${meal.summary}Explore a wide variety of mouth-watering meals shared by food enthusiasts in our community. Discover new recipes, share your own dishes, and connect with fellow food lovers today!`,
  };
}
export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealsSlug);
  if (!meal) {
    notFound();
  }

  // async function contentfulImageLoader(src, width) {
  //   'use server';
  //   const newsrc = await `${src}?w=${width}`;
  //   return newsrc;
  // }

  meal.instructions = meal.instructions.replace(/\n/g, '<br>');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <img
            // loader={contentfulImageLoader}
            src={`https://mtabbaeatsleeprepeat.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}></p>
      </main>
    </>
  );
}
