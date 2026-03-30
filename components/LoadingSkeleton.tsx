import { motion } from 'motion/react';

const skeletonBlock =
  'relative overflow-hidden rounded-md border border-gray-200/80 bg-gray-100/80 dark:border-neutral-800 dark:bg-neutral-900';

function Shimmer() {
  return (
    <motion.span
      aria-hidden
      className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/10"
      animate={{ x: ['0%', '300%'] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export default function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full"
    >
      <div className="mx-auto max-w-4xl space-y-5">
        <div className={`${skeletonBlock} h-12 w-2/5`}>
          <Shimmer />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`${skeletonBlock} h-20`}>
              <Shimmer />
            </div>
          ))}
        </div>

        {[...Array(3)].map((_, i) => (
          <article key={i} className="rounded-lg border border-gray-200/80 bg-white/80 p-4 dark:border-neutral-800 dark:bg-neutral-950/80">
            <div className="space-y-3">
              <div className={`${skeletonBlock} h-5 w-1/3`}>
                <Shimmer />
              </div>
              <div className={`${skeletonBlock} h-4 w-full`}>
                <Shimmer />
              </div>
              <div className={`${skeletonBlock} h-4 w-5/6`}>
                <Shimmer />
              </div>
              <div className={`${skeletonBlock} h-4 w-2/3`}>
                <Shimmer />
              </div>
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
}
