import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function Success() {
  const [searchParams] = useSearchParams();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState('');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    async function fetchInvoice() {
      try {
        const res = await fetch(`http://localhost:3000/invoice?session_id=${sessionId}`);
        const data = await res.json();
        if (res.ok) {
          setInvoice(data);
        } else {
          setError(data.error || 'Failed to load receipt');
        }
      } catch (e) {
        setError('Network error while fetching receipt');
      }
    }
    if (sessionId) fetchInvoice();
  }, [sessionId]);

  if (error) return <div style={{ padding: 24 }}><h2>Payment Successful</h2><p>{error}</p></div>;
  if (!invoice) return <div style={{ padding: 24 }}>Loading receipt...</div>;

  const amount = typeof invoice.amount === 'number' ? (invoice.amount / 100).toFixed(2) : null;

  return (
    <div className="invoice-container" style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <h2>Payment Successful!</h2>
      <div style={{ marginTop: 16, padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>{invoice.type === 'invoice' ? 'Invoice' : 'Payment Receipt'}</h3>
        <p><strong>ID:</strong> {invoice.id}</p>
        {amount && (
          <p><strong>Amount:</strong> ${amount} {invoice.currency}</p>
        )}
        {invoice.status && <p><strong>Status:</strong> {invoice.status}</p>}
        {invoice.customer_email && <p><strong>Email:</strong> {invoice.customer_email}</p>}
        {invoice.number && <p><strong>Invoice Number:</strong> {invoice.number}</p>}
        {invoice.brand && invoice.last4 && (
          <p><strong>Card:</strong> {invoice.brand.toUpperCase()} •••• {invoice.last4}</p>
        )}
        {invoice.hosted_invoice_url && (
          <p><a href={invoice.hosted_invoice_url} target="_blank" rel="noreferrer">View Hosted Invoice</a></p>
        )}
        {invoice.receipt_url && (
          <p><a href={invoice.receipt_url} target="_blank" rel="noreferrer">View Receipt</a></p>
        )}
      </div>
    </div>
  );
}