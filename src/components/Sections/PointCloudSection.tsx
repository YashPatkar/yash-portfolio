import { Suspense, lazy } from 'react';

const PointCloud = lazy(() => import('../Three/PointCloud'));

const PointCloudSection = () => {
  return (
    <section
      aria-hidden="true"
      className="relative h-[80vh] w-full bg-[var(--color-jet)] overflow-hidden"
    >
      <Suspense fallback={null}>
        <PointCloud />
      </Suspense>
      <span className="label-mono absolute left-6 md:left-10 lg:left-16 top-10 text-[var(--color-butter)]">
        / 01 — TRANSMISSION
      </span>
      <span className="label-mono absolute right-6 md:right-10 lg:right-16 bottom-10 text-[var(--color-butter)]">
        SCROLL ↓
      </span>
    </section>
  );
};

export default PointCloudSection;
