import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Enviando recuperação para:", email);
    // Aqui você chamaria a API pra enviar o e-mail de reset
  };

  return (
    <div className="container mt-5">
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-warning">Enviar Link</button>
      </form>
    </div>
  );
}
