import Link from 'next/link';
import { generateModelBreadcrumbs } from '@/lib/seo/schema/breadcrumb';

interface BreadcrumbProps {
  modelName: string;
  modelSlug: string;
}

export default function Breadcrumb({ modelName, modelSlug }: BreadcrumbProps) {
  const breadcrumbs = [
    { name: 'Forside', url: '/' },
    { name: 'Reparation & priser', url: '/reparationer' },
    { name: 'Apple', url: '/reparationer/apple' },
    { name: modelName, url: `/reparationer/apple/${modelSlug}` }
  ];

  return (
    <>
      {/* Visual breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((item, index) => (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{item.name}</span>
                ) : (
                  <Link href={item.url} className="hover:text-gray-900 transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateModelBreadcrumbs(modelName, modelSlug))
        }}
      />
    </>
  );
}
