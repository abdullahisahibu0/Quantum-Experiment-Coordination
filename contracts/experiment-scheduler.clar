;; Experiment Scheduler Contract

(define-data-var last-experiment-id uint u0)

(define-map experiments
  { experiment-id: uint }
  {
    creator: principal,
    title: (string-ascii 100),
    description: (string-utf8 1000),
    start-time: uint,
    duration: uint,
    locations: (list 10 principal),
    status: (string-ascii 20)
  }
)

(define-public (schedule-experiment
    (title (string-ascii 100))
    (description (string-utf8 1000))
    (start-time uint)
    (duration uint)
    (locations (list 10 principal)))
  (let
    (
      (new-id (+ (var-get last-experiment-id) u1))
    )
    (map-set experiments
      { experiment-id: new-id }
      {
        creator: tx-sender,
        title: title,
        description: description,
        start-time: start-time,
        duration: duration,
        locations: locations,
        status: "scheduled"
      }
    )
    (var-set last-experiment-id new-id)
    (ok new-id)
  )
)

(define-public (start-experiment (experiment-id uint))
  (let
    (
      (experiment (unwrap! (map-get? experiments { experiment-id: experiment-id }) (err u404)))
    )
    (asserts! (is-eq (get creator experiment) tx-sender) (err u403))
    (asserts! (is-eq (get status experiment) "scheduled") (err u400))
    (ok (map-set experiments
      { experiment-id: experiment-id }
      (merge experiment { status: "in-progress" })
    ))
  )
)

(define-public (complete-experiment (experiment-id uint))
  (let
    (
      (experiment (unwrap! (map-get? experiments { experiment-id: experiment-id }) (err u404)))
    )
    (asserts! (is-eq (get creator experiment) tx-sender) (err u403))
    (asserts! (is-eq (get status experiment) "in-progress") (err u400))
    (ok (map-set experiments
      { experiment-id: experiment-id }
      (merge experiment { status: "completed" })
    ))
  )
)

(define-read-only (get-experiment (experiment-id uint))
  (ok (map-get? experiments { experiment-id: experiment-id }))
)

