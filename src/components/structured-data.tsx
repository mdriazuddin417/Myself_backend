import Script from "next/script"

interface PersonStructuredDataProps {
  name: string
  jobTitle: string
  description: string
  url: string
  email: string
  location: string
  image: string
  sameAs: string[]
}

export function PersonStructuredData({
  name,
  jobTitle,
  description,
  url,
  email,
  location,
  image,
  sameAs,
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    jobTitle: jobTitle,
    description: description,
    url: url,
    email: email,
    address: {
      "@type": "Place",
      name: location,
    },
    image: image,
    sameAs: sameAs,
  }

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

interface BlogPostStructuredDataProps {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified: string
  url: string
  image: string
}

export function BlogPostStructuredData({
  title,
  description,
  author,
  datePublished,
  dateModified,
  url,
  image,
}: BlogPostStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: datePublished,
    dateModified: dateModified,
    url: url,
    image: image,
    publisher: {
      "@type": "Person",
      name: author,
    },
  }

  return (
    <Script
      id="blog-post-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

interface WebsiteStructuredDataProps {
  name: string
  description: string
  url: string
}

export function WebsiteStructuredData({ name, description, url }: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: name,
    description: description,
    url: url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
