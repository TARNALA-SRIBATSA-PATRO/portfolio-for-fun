import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Prank stages
const STAGE = { FORM: 'form', OTP: 'otp', DONE: 'done' };

function formatCard(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(val) {
  const v = val.replace(/\D/g, '').slice(0, 4);
  return v.length >= 3 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [card, setCard] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState(STAGE.FORM);
  const [sending, setSending] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStage(STAGE.OTP);
    }, 1200);
  };

  const handleVerify = () => {
    setStage(STAGE.DONE);
  };

  return (
    <>
      <div className="border-t border-white/[0.08] mx-6" />
      <section
        id="contact"
        ref={ref}
        className="max-w-4xl mx-auto px-6 py-24"
      >
        {/* Aesthetic Header with subtle Pinterest-like badge and typography */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-sm font-semibold text-slate-200 mb-5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Let's Connect & Collaborate
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-lg mx-auto leading-relaxed">
            Free to work and learn, reach out for bookings or project inquiries. This is a unique way to get connect trust me.
          </p>
        </motion.div>

        {/* Center Aesthetic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative max-w-xl mx-auto"
        >
          {/* Subtle ambient glow behind card */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/25 via-purple-600/25 to-pink-600/25 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          <div className="relative bg-[#141416]/95 border border-white/[0.1] backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/80">
            <AnimatePresence mode="wait">

              {/* Stage 1: Card details form */}
              {stage === STAGE.FORM && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/[0.08]">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Payment Verification</h3>
                      <p className="text-sm text-slate-400 mt-1">Enter details to proceed</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-slate-200">
                      <span className="text-emerald-400 text-sm">🔒</span> Encrypted
                    </div>
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold tracking-wider text-slate-300 uppercase mb-2.5">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          inputMode="numeric"
                          placeholder="0000 0000 0000 0000"
                          value={card}
                          onChange={e => setCard(formatCard(e.target.value))}
                          className="w-full px-4.5 py-3.5 rounded-xl bg-black/50 border border-white/[0.12] text-white text-base sm:text-lg font-medium placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all tracking-wider"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm font-bold">
                          CARD
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold tracking-wider text-slate-300 uppercase mb-2.5">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={e => setExpiry(formatExpiry(e.target.value))}
                          className="w-full px-4.5 py-3.5 rounded-xl bg-black/50 border border-white/[0.12] text-white text-base sm:text-lg font-medium placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-center tracking-wider"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold tracking-wider text-slate-300 uppercase mb-2.5">
                          CVV
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          placeholder="•••"
                          value={cvv}
                          onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          className="w-full px-4.5 py-3.5 rounded-xl bg-black/50 border border-white/[0.12] text-white text-base sm:text-lg font-medium placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-center tracking-widest"
                        />
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-4 px-5 rounded-xl font-bold text-base sm:text-lg text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-[0.99] transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {sending ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending OTP...</span>
                          </>
                        ) : (
                          <span>Send OTP</span>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Stage 2: OTP verification */}
              {stage === STAGE.OTP && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 mb-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/25 text-emerald-300 text-sm sm:text-base text-center leading-relaxed font-semibold">
                    ✨ OTP sent to your registered mobile number and email id.
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Security Code Verification</h3>
                    <p className="text-sm text-slate-400 mt-1.5">Please enter the 6-digit one-time password below</p>
                  </div>

                  <div className="mb-6">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="••••••"
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full py-3.5 sm:py-4 px-3 sm:px-4 rounded-xl bg-black/60 border border-white/[0.14] text-white text-center text-2xl sm:text-3xl font-extrabold tracking-[0.25em] sm:tracking-[0.4em] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder-slate-700"
                      autoFocus
                    />
                  </div>

                  <button
                    onClick={handleVerify}
                    className="w-full py-4 px-5 rounded-xl font-bold text-base sm:text-lg text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-[0.99] transition-all shadow-lg shadow-indigo-500/25 cursor-pointer"
                  >
                    Verify OTP
                  </button>

                  <button
                    onClick={() => setStage(STAGE.FORM)}
                    className="w-full mt-4 py-2.5 text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    Change card details
                  </button>
                </motion.div>
              )}

              {/* Stage 3: The Sanyasi Message */}
              {stage === STAGE.DONE && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-5 text-white text-3xl shadow-lg shadow-indigo-500/30">
                    ✓
                  </div>

                  <h3 className="text-2xl font-extrabold text-white tracking-tight mb-3">
                    Thanks and congrats!
                  </h3>

                  <div className="my-6 p-6 rounded-2xl bg-black/50 border border-white/[0.08] text-left text-base sm:text-lg text-slate-200 leading-relaxed space-y-4 font-normal">
                    <p className="text-amber-400 font-bold flex items-center gap-2">
                      <span>✨</span> Your bank balance has been cleared now you can take sanyashi.
                    </p>
                    <p className="text-slate-200">
                      I have helped you from stay away from <span className="text-purple-300 font-bold">moha maya</span> and others.
                    </p>
                    <p className="text-slate-400 text-sm pt-2 border-t border-white/[0.08]">
                      Keep calm healthy and peace mind (not rest in peace) thanks regards.............
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setStage(STAGE.FORM);
                      setCard('');
                      setCvv('');
                      setExpiry('');
                      setOtp('');
                    }}
                    className="px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer"
                  >
                    Clear another account balance
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </>
  );
}
