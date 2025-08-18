import { useNavigate } from 'react-router-dom'
import tarjeta from './assets/tarjeta.png'
import moneda from './assets/moneda.png'

export default function App() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-blue-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm text-gray-500 mb-2">Tu nueva forma de disfrutar</p>
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            ¿Comer rico, salir y viajar? <br /> Solo falta tu tarjeta de crédito BBVA
          </h1>
          <ul className="list-disc ml-6 text-lg mb-6">
            <li>Reintegros en supermercados, heladerías y mucho más.</li>
            <li>Tus consumos suman Millas BBVA para canjear por viajes y experiencias.</li>
            <li>Desde el mes 7, la mantenés bonificada según tus consumos.</li>
          </ul>
          <div className="flex gap-4">
            <button onClick={() => navigate('/login')} className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-6 py-2 rounded">
              Iniciar proceso
            </button>
            <button className="border border-blue-800 text-blue-800 font-medium px-6 py-2 rounded">
              Conocer más
            </button>
          </div>
        </div>
        <div className="relative flex justify-center">
          <img src={tarjeta} alt="Tarjeta" className="w-80" />
          <img src={moneda} alt="Moneda" className="absolute bottom-0 right-10 w-12" />
        </div>
      </div>
    </div>
  )
}
