// Mocked until a real endpoint exists — swap for a `post(CAREGIVER.INVITE,
// payload)` call (see network/http.js) once a backend is available.
export function inviteCaregiverFn(payload) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: payload.name }), 500);
  });
}
