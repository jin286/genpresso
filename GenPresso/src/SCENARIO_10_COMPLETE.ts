  nodes: [
    // ===== ROW 1: Y = 100-500 =====
    
    // GROUP 1 - Interior Design (Column 1: X = 100-600, Yellow)
    { id: 'node-1', type: 'text', content: '모던 거실 디자인', prompt: 'Modern living room design', x: 100, y: 150, isOutput: false, metadata: { model: 'flux-pro' } },
    { id: 'node-2', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', prompt: 'Living room 1', x: 350, y: 100, metadata: { model: 'flux-pro', ratio: '16:9' } },
    { id: 'node-3', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', prompt: 'Living room 2', x: 350, y: 320, metadata: { model: 'flux-pro', ratio: '16:9' } },
    { id: 'node-4', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800', prompt: 'Final composition', x: 550, y: 210, metadata: { model: 'flux-pro', ratio: '16:9' } },
    
    // GROUP 2 - Product Design (Column 2: X = 800-1300, Blue)
    { id: 'node-5', type: 'text', content: '제품 디자인', prompt: 'Product design', x: 800, y: 150, isOutput: false, metadata: { model: 'midjourney-v6' } },
    { id: 'node-6', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', prompt: 'Product 1', x: 1050, y: 100, metadata: { model: 'midjourney-v6', ratio: '1:1' } },
    { id: 'node-7', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1592286927505-e7d50b3dc4f4?w=800', prompt: 'Product 2', x: 1050, y: 320, metadata: { model: 'midjourney-v6', ratio: '1:1' } },
    { id: 'node-8', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800', prompt: 'Final product', x: 1250, y: 210, metadata: { model: 'midjourney-v6', ratio: '16:9' } },
    
    // GROUP 3 - Nature Scenes (Column 3: X = 1500-2000, Pink)
    { id: 'node-9', type: 'text', content: '자연 풍경', prompt: 'Nature landscapes', x: 1500, y: 150, isOutput: false, metadata: { model: 'dall-e-3' } },
    { id: 'node-10', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', prompt: 'Mountain', x: 1750, y: 100, metadata: { model: 'dall-e-3', ratio: '16:9' } },
    { id: 'node-11', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800', prompt: 'Ocean', x: 1750, y: 320, metadata: { model: 'dall-e-3', ratio: '16:9' } },
    { id: 'node-12', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800', prompt: 'Forest', x: 1950, y: 210, metadata: { model: 'dall-e-3', ratio: '16:9' } },
    
    // GROUP 4 - Architecture (Column 4: X = 2200-2700, Green)
    { id: 'node-13', type: 'text', content: '건축 디자인', prompt: 'Architecture', x: 2200, y: 150, isOutput: false, metadata: { model: 'stable-diffusion-xl' } },
    { id: 'node-14', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', prompt: 'Building 1', x: 2450, y: 100, metadata: { model: 'stable-diffusion-xl', ratio: '16:9' } },
    { id: 'node-15', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800', prompt: 'Building 2', x: 2450, y: 320, metadata: { model: 'stable-diffusion-xl', ratio: '16:9' } },
    { id: 'node-16', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1554793000-245d3a3c2a51?w=800', prompt: 'Bridge', x: 2650, y: 210, metadata: { model: 'stable-diffusion-xl', ratio: '16:9' } },
    
    // ===== ROW 2: Y = 700-1100 =====
    
    // GROUP 5 - Food Photography (Column 1: X = 100-600, Purple)
    { id: 'node-17', type: 'text', content: '음식 사진', prompt: 'Food photography', x: 100, y: 750, isOutput: false, metadata: { model: 'flux-pro' } },
    { id: 'node-18', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800', prompt: 'Dish 1', x: 350, y: 700, metadata: { model: 'flux-pro', ratio: '1:1' } },
    { id: 'node-19', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800', prompt: 'Dish 2', x: 350, y: 920, metadata: { model: 'flux-pro', ratio: '1:1' } },
    { id: 'node-20', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1514066558159-fc8c737ef259?w=800', prompt: 'Final plating', x: 550, y: 810, metadata: { model: 'flux-pro', ratio: '16:9' } },
    
    // GROUP 6 - Tech & AI (Column 2: X = 800-1300, Orange)
    { id: 'node-21', type: 'text', content: 'AI 기술', prompt: 'AI technology', x: 800, y: 750, isOutput: false, metadata: { model: 'midjourney-v6' } },
    { id: 'node-22', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', prompt: 'Robot', x: 1050, y: 700, metadata: { model: 'midjourney-v6', ratio: '1:1' } },
    { id: 'node-23', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', prompt: 'Hologram', x: 1050, y: 920, metadata: { model: 'midjourney-v6', ratio: '1:1' } },
    { id: 'node-24', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800', prompt: 'Final scene', x: 1250, y: 810, metadata: { model: 'midjourney-v6', ratio: '16:9' } },
    
    // GROUP 7 - Abstract Art (Column 3: X = 1500-2000, Yellow)
    { id: 'node-25', type: 'text', content: '추상 아트', prompt: 'Abstract art', x: 1500, y: 750, isOutput: false, metadata: { model: 'dall-e-3' } },
    { id: 'node-26', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800', prompt: 'Geometric', x: 1750, y: 700, metadata: { model: 'dall-e-3', ratio: '1:1' } },
    { id: 'node-27', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800', prompt: 'Color splash', x: 1750, y: 920, metadata: { model: 'dall-e-3', ratio: '1:1' } },
    { id: 'node-28', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', prompt: 'Fluid', x: 1950, y: 810, metadata: { model: 'dall-e-3', ratio: '1:1' } },
    
    // GROUP 8 - Wildlife (Column 4: X = 2200-2700, Blue)
    { id: 'node-29', type: 'text', content: '야생동물', prompt: 'Wildlife', x: 2200, y: 750, isOutput: false, metadata: { model: 'stable-diffusion-xl' } },
    { id: 'node-30', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800', prompt: 'Tiger', x: 2450, y: 700, metadata: { model: 'stable-diffusion-xl', ratio: '16:9' } },
    { id: 'node-31', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800', prompt: 'Eagle', x: 2450, y: 920, metadata: { model: 'stable-diffusion-xl', ratio: '16:9' } },
    { id: 'node-32', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', prompt: 'Dolphin', x: 2650, y: 810, metadata: { model: 'stable-diffusion-xl', ratio: '16:9' } },
    
    // ===== ROW 3: Y = 1300-1700 =====
    
    // GROUP 9 - Fashion (Column 1: X = 100-600, Pink)
    { id: 'node-33', type: 'text', content: '패션', prompt: 'Fashion', x: 100, y: 1350, isOutput: false, metadata: { model: 'flux-pro' } },
    { id: 'node-34', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800', prompt: 'Haute couture', x: 350, y: 1300, metadata: { model: 'flux-pro', ratio: '9:16' } },
    { id: 'node-35', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800', prompt: 'Accessories', x: 350, y: 1520, metadata: { model: 'flux-pro', ratio: '1:1' } },
    { id: 'node-36', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', prompt: 'Editorial', x: 550, y: 1410, metadata: { model: 'flux-pro', ratio: '16:9' } },
    
    // GROUP 10 - Space (Column 2: X = 800-1300, Green)
    { id: 'node-37', type: 'text', content: '우주', prompt: 'Space', x: 800, y: 1350, isOutput: false, metadata: { model: 'midjourney-v6' } },
    { id: 'node-38', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800', prompt: 'Galaxy', x: 1050, y: 1300, metadata: { model: 'midjourney-v6', ratio: '16:9' } },
    { id: 'node-39', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800', prompt: 'Planet', x: 1050, y: 1520, metadata: { model: 'midjourney-v6', ratio: '1:1' } },
    { id: 'node-40', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800', prompt: 'Nebula', x: 1250, y: 1410, metadata: { model: 'midjourney-v6', ratio: '16:9' } },
    
    // GROUP 11 - Sports (Column 3: X = 1500-2000, Purple)
    { id: 'node-41', type: 'text', content: '스포츠', prompt: 'Sports', x: 1500, y: 1350, isOutput: false, metadata: { model: 'flux-pro' } },
    { id: 'node-42', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800', prompt: 'Surfing', x: 1750, y: 1300, metadata: { model: 'flux-pro', ratio: '16:9' } },
    { id: 'node-43', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800', prompt: 'Biking', x: 1750, y: 1520, metadata: { model: 'flux-pro', ratio: '16:9' } },
    { id: 'node-44', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', prompt: 'Collage', x: 1950, y: 1410, metadata: { model: 'flux-pro', ratio: '16:9' } },
    
    // GROUP 12 - Urban Life (Column 4: X = 2200-2700, Orange)
    { id: 'node-45', type: 'text', content: '도시', prompt: 'Urban', x: 2200, y: 1350, isOutput: false, metadata: { model: 'dall-e-3' } },
    { id: 'node-46', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800', prompt: 'Cityscape', x: 2450, y: 1300, metadata: { model: 'dall-e-3', ratio: '16:9' } },
    { id: 'node-47', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800', prompt: 'Street', x: 2450, y: 1520, metadata: { model: 'dall-e-3', ratio: '1:1' } },
    { id: 'node-48', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800', prompt: 'Night scene', x: 2650, y: 1410, metadata: { model: 'dall-e-3', ratio: '16:9' } },
  ],
  edges: [
    // GROUP 1 - Interior Design (text → 3 images)
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
    { id: 'edge-2', sourceId: 'node-1', targetId: 'node-3' },
    { id: 'edge-3', sourceId: 'node-2', targetId: 'node-4' },
    { id: 'edge-4', sourceId: 'node-3', targetId: 'node-4' },
    
    // GROUP 2 - Product Design (text → 3 images)
    { id: 'edge-5', sourceId: 'node-5', targetId: 'node-6' },
    { id: 'edge-6', sourceId: 'node-5', targetId: 'node-7' },
    { id: 'edge-7', sourceId: 'node-6', targetId: 'node-8' },
    { id: 'edge-8', sourceId: 'node-7', targetId: 'node-8' },
    
    // GROUP 3 - Nature Scenes (text → 3 images)
    { id: 'edge-9', sourceId: 'node-9', targetId: 'node-10' },
    { id: 'edge-10', sourceId: 'node-9', targetId: 'node-11' },
    { id: 'edge-11', sourceId: 'node-10', targetId: 'node-12' },
    { id: 'edge-12', sourceId: 'node-11', targetId: 'node-12' },
    
    // GROUP 4 - Architecture (text → 3 images)
    { id: 'edge-13', sourceId: 'node-13', targetId: 'node-14' },
    { id: 'edge-14', sourceId: 'node-13', targetId: 'node-15' },
    { id: 'edge-15', sourceId: 'node-14', targetId: 'node-16' },
    { id: 'edge-16', sourceId: 'node-15', targetId: 'node-16' },
    
    // GROUP 5 - Food Photography (text → 3 images)
    { id: 'edge-17', sourceId: 'node-17', targetId: 'node-18' },
    { id: 'edge-18', sourceId: 'node-17', targetId: 'node-19' },
    { id: 'edge-19', sourceId: 'node-18', targetId: 'node-20' },
    { id: 'edge-20', sourceId: 'node-19', targetId: 'node-20' },
    
    // GROUP 6 - Tech & AI (text → 3 images)
    { id: 'edge-21', sourceId: 'node-21', targetId: 'node-22' },
    { id: 'edge-22', sourceId: 'node-21', targetId: 'node-23' },
    { id: 'edge-23', sourceId: 'node-22', targetId: 'node-24' },
    { id: 'edge-24', sourceId: 'node-23', targetId: 'node-24' },
    
    // GROUP 7 - Abstract Art (text → 3 images)
    { id: 'edge-25', sourceId: 'node-25', targetId: 'node-26' },
    { id: 'edge-26', sourceId: 'node-25', targetId: 'node-27' },
    { id: 'edge-27', sourceId: 'node-26', targetId: 'node-28' },
    { id: 'edge-28', sourceId: 'node-27', targetId: 'node-28' },
    
    // GROUP 8 - Wildlife (text → 3 images)
    { id: 'edge-29', sourceId: 'node-29', targetId: 'node-30' },
    { id: 'edge-30', sourceId: 'node-29', targetId: 'node-31' },
    { id: 'edge-31', sourceId: 'node-30', targetId: 'node-32' },
    { id: 'edge-32', sourceId: 'node-31', targetId: 'node-32' },
    
    // GROUP 9 - Fashion (text → 3 images)
    { id: 'edge-33', sourceId: 'node-33', targetId: 'node-34' },
    { id: 'edge-34', sourceId: 'node-33', targetId: 'node-35' },
    { id: 'edge-35', sourceId: 'node-34', targetId: 'node-36' },
    { id: 'edge-36', sourceId: 'node-35', targetId: 'node-36' },
    
    // GROUP 10 - Space (text → 3 images)
    { id: 'edge-37', sourceId: 'node-37', targetId: 'node-38' },
    { id: 'edge-38', sourceId: 'node-37', targetId: 'node-39' },
    { id: 'edge-39', sourceId: 'node-38', targetId: 'node-40' },
    { id: 'edge-40', sourceId: 'node-39', targetId: 'node-40' },
    
    // GROUP 11 - Sports (text → 3 images)
    { id: 'edge-41', sourceId: 'node-41', targetId: 'node-42' },
    { id: 'edge-42', sourceId: 'node-41', targetId: 'node-43' },
    { id: 'edge-43', sourceId: 'node-42', targetId: 'node-44' },
    { id: 'edge-44', sourceId: 'node-43', targetId: 'node-44' },
    
    // GROUP 12 - Urban Life (text → 3 images)
    { id: 'edge-45', sourceId: 'node-45', targetId: 'node-46' },
    { id: 'edge-46', sourceId: 'node-45', targetId: 'node-47' },
    { id: 'edge-47', sourceId: 'node-46', targetId: 'node-48' },
    { id: 'edge-48', sourceId: 'node-47', targetId: 'node-48' },
  ],
  groups: [
    { 
      id: 'group-1', 
      name: 'Interior Design', 
      nodeIds: ['node-1', 'node-2', 'node-3', 'node-4'], 
      color: 'yellow',
      echo: 75,
      insight: 60,
      spark: 40,
      description: '모던하고 따뜻한 분위기의 거실 디자인 그룹',
      selectedImageNodeIds: ['node-2', 'node-3'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-2', 
      name: 'Product Design', 
      nodeIds: ['node-5', 'node-6', 'node-7', 'node-8'], 
      color: 'blue',
      echo: 85,
      insight: 70,
      spark: 30,
      description: '제품의 디테일과 질감을 강조하는 디자인 그룹',
      selectedImageNodeIds: ['node-6', 'node-7'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-3', 
      name: 'Nature Scenes', 
      nodeIds: ['node-9', 'node-10', 'node-11', 'node-12'], 
      color: 'pink',
      echo: 50,
      insight: 55,
      spark: 90,
      description: '자연 풍경 시리즈 - 산, 바다, 숲의 아름다운 장면들',
      selectedImageNodeIds: ['node-10', 'node-11'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-4', 
      name: 'Architecture', 
      nodeIds: ['node-13', 'node-14', 'node-15', 'node-16'], 
      color: 'green',
      echo: 70,
      insight: 80,
      spark: 45,
      description: '현대적인 건축물과 구조미를 담은 그룹',
      selectedImageNodeIds: ['node-14', 'node-15'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-5', 
      name: 'Food Photography', 
      nodeIds: ['node-17', 'node-18', 'node-19', 'node-20'], 
      color: 'purple',
      echo: 65,
      insight: 75,
      spark: 55,
      description: '음식의 맛과 멋을 담은 사진 그룹',
      selectedImageNodeIds: ['node-18', 'node-19'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-6', 
      name: 'Tech & AI', 
      nodeIds: ['node-21', 'node-22', 'node-23', 'node-24'], 
      color: 'orange',
      echo: 80,
      insight: 65,
      spark: 50,
      description: '미래 기술과 AI 로봇을 다룬 그룹',
      selectedImageNodeIds: ['node-22', 'node-23'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-7', 
      name: 'Abstract Art', 
      nodeIds: ['node-25', 'node-26', 'node-27', 'node-28'], 
      color: 'yellow',
      echo: 40,
      insight: 60,
      spark: 95,
      description: '추상적인 패턴과 색상의 예술 그룹',
      selectedImageNodeIds: ['node-26', 'node-27'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-8', 
      name: 'Wildlife', 
      nodeIds: ['node-29', 'node-30', 'node-31', 'node-32'], 
      color: 'blue',
      echo: 60,
      insight: 70,
      spark: 65,
      description: '야생동물의 생동감 넘치는 순간을 담은 그룹',
      selectedImageNodeIds: ['node-30', 'node-31'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-9', 
      name: 'Fashion', 
      nodeIds: ['node-33', 'node-34', 'node-35', 'node-36'], 
      color: 'pink',
      echo: 70,
      insight: 75,
      spark: 60,
      description: '패션과 스타일을 담은 그룹',
      selectedImageNodeIds: ['node-34', 'node-35'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-10', 
      name: 'Space Exploration', 
      nodeIds: ['node-37', 'node-38', 'node-39', 'node-40'], 
      color: 'green',
      echo: 55,
      insight: 85,
      spark: 75,
      description: '우주의 신비로움을 담은 그룹',
      selectedImageNodeIds: ['node-38', 'node-39'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-11', 
      name: 'Sports Action', 
      nodeIds: ['node-41', 'node-42', 'node-43', 'node-44'], 
      color: 'purple',
      echo: 75,
      insight: 65,
      spark: 70,
      description: '스포츠의 역동적인 순간을 담은 그룹',
      selectedImageNodeIds: ['node-42', 'node-43'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-12', 
      name: 'Urban Life', 
      nodeIds: ['node-45', 'node-46', 'node-47', 'node-48'], 
      color: 'orange',
      echo: 65,
      insight: 70,
      spark: 55,
      description: '도시의 생동감 넘치는 풍경을 담은 그룹',
      selectedImageNodeIds: ['node-46', 'node-47'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ]
