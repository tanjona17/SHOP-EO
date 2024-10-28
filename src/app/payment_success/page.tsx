"use client"
import { useSearchParams } from 'next/navigation';
import React from 'react';
;

export default function Page() {
  const params = useSearchParams();
  const amount = params.get("amount");
  return (
    <div>
      Payment of ${amount} successful
      
    </div>
  )
}
