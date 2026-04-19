'use client';

import { motion } from 'framer-motion';
import { CoffeeProduct } from '@/data/products';

interface ProductCardProps {
  product: CoffeeProduct;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group bg-[#3D2820]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#5A4034] hover:border-[#4F9C8F] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#4F9C8F]/20"
    >
      {/* Star Rating */}
      <div className="flex items-center gap-2 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-lg transition-all ${
              i < Math.floor(product.rating)
                ? 'text-[#FFD700]'
                : i === Math.floor(product.rating) && product.rating % 1 >= 0.5
                ? 'text-[#FFD700]'
                : 'text-[#5A4034]/50'
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-[#F5E6D3] font-semibold text-sm">
          {product.rating}
        </span>
      </div>
      
      {/* Coffee Image */}
      <div className="w-full h-56 bg-[#2D1810] rounded-xl mb-5 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 group-hover:brightness-110"
          loading="lazy"
        />
      </div>
      
      {/* Title & Description */}
      <h3 className="text-2xl font-['playfair'] font-bold text-[#F5E6D3] mb-3 group-hover:text-[#4F9C8F] transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-[#C9B8A0] mb-5 line-clamp-2 font-['inter'] leading-relaxed">
        {product.description}
      </p>
      
      {/* Price & Add Button */}
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-[#F5E6D3] font-['inter']">
          {product.price}
        </span>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F9C8F] to-[#3D8B7F] flex items-center justify-center hover:shadow-lg hover:shadow-[#4F9C8F]/40 transition-all duration-300"
        >
          <span className="text-white text-2xl font-bold">+</span>
        </motion.button>
      </div>

      {/* Features */}
      <div className="mt-4 pt-4 border-t border-[#5A4034]/50">
        <div className="flex flex-wrap gap-1">
          {product.features.map((feature, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-[#5A4034]/30 text-xs rounded-full text-[#C9B8A0] font-['inter']"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
