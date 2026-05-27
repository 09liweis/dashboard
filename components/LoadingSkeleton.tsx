import { motion } from 'motion/react';

const skeletonBlock =
  'relative overflow-hidden rounded-lg border border-blue-200/50 bg-gradient-to-br from-blue-50 to-gray-100';

function Shimmer() {
  return (
    <motion.span
      aria-hidden
      className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"
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
        <div className={`${skeletonBlock} h-12 w-2/5 shadow-sm`}>
          <Shimmer />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`${skeletonBlock} h-20 shadow-sm`}>
              <Shimmer />
            </div>
          ))}
        </div>

        {[...Array(3)].map((_, i) => (
          <article key={i} className="rounded-lg border border-blue-200/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
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
