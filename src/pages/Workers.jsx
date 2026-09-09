import { useEffect, useState } from 'react'
import { fetchWorkers, fetchBadges } from '../services/mockApi.js'
import StatusPill from '../components/StatusPill.jsx'

export default function Workers({ onOpenWorker }) {
  const [workers, setWorkers] = useState([])
  const [badges, setBadges] = useState([])

  useEffect(() => {
    fetchWorkers().then(setWorkers)
    fetchBadges().then(setBadges)
  }, [])

  return (
    <div>
      <div className="page-title">Workers</div>
      <div className="page-sub">Everyone currently on the badge programme.</div>

      <div className="worker-grid">
        {workers.map((w) => {
          const badge = badges.find((b) => b.badgeId === w.badgeId)
          return (
            <button key={w.id} className="panel worker-card" onClick={() => onOpenWorker(w.id)}>
              <div className="worker-card-name">{w.name}</div>
              <div className="worker-card-role text-muted">{w.role}</div>
              <hr className="hairline" />
              <div className="worker-card-row">
                <span className="text-muted">Site</span>
                <span>{w.site}</span>
              </div>
              <div className="worker-card-row">
                <span className="text-muted">Badge</span>
                <span className="mono">{w.badgeId}</span>
              </div>
              {badge && (
                <div className="worker-card-row">
                  <span className="text-muted">Expires</span>
                  <span className="mono">{badge.expiresOn}</span>
                </div>
              )}
              {badge && (
                <div className="worker-card-status">
                  <StatusPill status={badge.status} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      <style>{`
        .worker-grid {
          margin-top: 18px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px;
        }
        .worker-card {
          text-align: left;
          cursor: pointer;
          color: var(--text-primary);
        }
        .worker-card:hover {
          border-color: var(--amber-400);
        }
        .worker-card-name {
          font-size: 15px;
          font-weight: 600;
        }
        .worker-card-role {
          font-size: 13px;
          margin-top: 2px;
        }
        .worker-card-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          padding: 3px 0;
        }
        .worker-card-status {
          margin-top: 8px;
        }
      `}</style>
    </div>
  )
}
