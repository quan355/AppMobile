// recipesData.js
const trendingRecipes = [
  {
    id: '1',
    title: 'Cách làm sushi tại nhà',
    image: require('./assets/images/sushi.png'),
    rating: 4.5,
    time: '15:10',
    author: 'Bởi Niki Samantha',
    category: 'Món Nhật', // Thêm category
    ingredients: [
      'Cơm sushi: 300g',
      'Cá hồi tươi: 200g',
      'Rong biển: 10 lá',
      'Giấm gạo: 50ml',
      'Dưa leo: 1 quả',
    ],
    instructions: [
      'Nấu cơm sushi và trộn với giấm gạo, để nguội.',
      'Cắt cá hồi và dưa leo thành thanh dài.',
      'Trải rong biển lên mành tre, dàn đều cơm lên rong biển.',
      'Đặt cá hồi và dưa leo ở giữa, cuộn chặt.',
      'Cắt cuộn sushi thành từng miếng và thưởng thức.',
    ],
  },
  {
    id: '2',
    title: 'Cách làm pizza',
    image: require('./assets/images/pizza.png'),
    rating: 4.7,
    time: '10:30',
    author: 'Bởi John Doe',
    category: 'Món Ý', // Thêm category
    ingredients: [
      'Bột mì: 500g',
      'Men nở: 7g',
      'Phô mai mozzarella: 200g',
      'Sốt cà chua: 100ml',
      'Xúc xích: 100g',
    ],
    instructions: [
      'Nhào bột với men nở, nước và muối, ủ 1 giờ.',
      'Cán bột thành đế bánh, phết sốt cà chua.',
      'Rải phô mai và xúc xích lên trên.',
      'Nướng ở 220°C trong 10-12 phút.',
      'Cắt lát và thưởng thức.',
    ],
  },
];

let recentRecipes = [
  {
    id: '3',
    title: 'Phở Việt Nam',
    image: require('./assets/images/pho.png'),
    rating: 4.8,
    time: '45:00',
    author: 'Bởi Anna Nguyễn',
    category: 'Món Việt', // Thêm category
    ingredients: [
      'Xương bò: 1kg',
      'Thịt bò: 300g',
      'Bánh phở: 500g',
      'Hành tây: 1 củ',
      'Gia vị phở: 1 gói',
    ],
    instructions: [
      'Ninh xương bò với hành tây trong 6 giờ để lấy nước dùng.',
      'Thêm gia vị phở và nêm nếm.',
      'Trụng bánh phở và xếp thịt bò thái mỏng lên trên.',
      'Chan nước dùng nóng, thêm hành lá và rau thơm.',
      'Thưởng thức với tương ớt và chanh.',
    ],
  },
  {
    id: '4',
    title: 'Bánh Mì Kẹp',
    image: require('./assets/images/banhmi.png'),
    rating: 4.3,
    time: '15:00',
    author: 'Bởi Minh Trần',
    category: 'Món Việt', // Thêm category
    ingredients: [
      'Bánh mì: 1 ổ',
      'Thịt heo quay: 100g',
      'Pate: 50g',
      'Dưa leo: 1/2 quả',
      'Rau răm: 10g',
    ],
    instructions: [
      'Cắt đôi ổ bánh mì, phết pate lên mặt trong.',
      'Xếp thịt heo quay, dưa leo và rau răm vào.',
      'Thêm tương ớt và nước mắm tùy khẩu vị.',
      'Kẹp chặt và thưởng thức.',
    ],
  },
  {
    id: '5',
    title: 'Gỏi Cuốn',
    image: require('./assets/images/goicuon.png'),
    rating: 4.6,
    time: '20:00',
    author: 'Bởi Linh Phạm',
    category: 'Món Việt', // Thêm category
    ingredients: [
      'Bánh tráng: 10 lá',
      'Tôm: 200g',
      'Thịt heo: 100g',
      'Bún: 100g',
      'Rau sống: 50g',
    ],
    instructions: [
      'Luộc tôm và thịt heo, thái mỏng.',
      'Làm ướt bánh tráng, xếp bún, tôm, thịt và rau sống lên.',
      'Cuốn chặt bánh tráng thành cuộn.',
      'Làm nước chấm với tỏi, ớt, chanh và nước mắm.',
      'Chấm gỏi cuốn và thưởng thức.',
    ],
  },
];

const categoryNames = ['Salad', 'Bữa sáng', 'Khai vị', 'Mì', 'Bữa trưa', 'Món Việt', 'Món Nhật', 'Món Ý'];

const popularCategories = [
  {
    id: '1',
    name: 'Salad Gà',
    image: require('./assets/images/chicken_salad.png'),
    time: '20:00',
  },
  {
    id: '2',
    name: 'Bánh Pancake',
    image: require('./assets/images/pancake.png'),
    time: '15:00',
  },
  {
    id: '3',
    name: 'Gỏi Cuốn',
    image: require('./assets/images/goicuon.png'),
    time: '10:00',
  },
  {
    id: '4',
    name: 'Mì Ramen',
    image: require('./assets/images/ramen.png'),
    time: '30:00',
  },
];

const defaultRecipeImage = require('./assets/images/anhmau1.png');

// Event emitter đơn giản
const listeners = [];
const emitChange = () => {
  console.log('Phát sự kiện thay đổi recentRecipes');
  listeners.forEach((listener) => listener());
};

const addRecipe = (newRecipe) => {
  console.log('Thêm công thức mới:', newRecipe);
  const recipeId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`; // Tạo id duy nhất
  const newRecipeData = {
    id: recipeId,
    title: newRecipe.title || 'Công thức không tên',
    image: newRecipe.image || defaultRecipeImage,
    rating: newRecipe.rating || 4.0,
    time: newRecipe.cookTime || 'Không xác định',
    author: newRecipe.author || 'Bởi Người dùng',
    category: newRecipe.category || 'Không rõ',
    ingredients: newRecipe.ingredients
      ? newRecipe.ingredients.map((item) => `${item.name}: ${item.quantity}`)
      : ['Chưa có nguyên liệu'],
    instructions: newRecipe.instructions && newRecipe.instructions.length > 0
      ? newRecipe.instructions
      : ['Chưa có hướng dẫn.'],
  };

  recentRecipes.unshift(newRecipeData);
  
  // Thêm vào trendingRecipes nếu phù hợp (ví dụ: rating cao)
  if (newRecipeData.rating > 4.0) {
    trendingRecipes.push(newRecipeData);
  }

  console.log('Danh sách công thức mới:', recentRecipes);
  emitChange();
};

const removeRecipe = (recipeId) => {
  console.log('Xóa công thức với ID:', recipeId);
  recentRecipes = recentRecipes.filter((recipe) => recipe.id !== recipeId);
  trendingRecipes = trendingRecipes.filter((recipe) => recipe.id !== recipeId); // Đồng bộ xóa ở trendingRecipes
  console.log('Danh sách công thức sau khi xóa:', recentRecipes);
  emitChange();
};

// Đăng ký listener
const addChangeListener = (listener) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index !== -1) listeners.splice(index, 1);
  };
};

export {
  trendingRecipes,
  recentRecipes,
  categoryNames,
  popularCategories,
  addRecipe,
  removeRecipe,
  defaultRecipeImage,
  addChangeListener,
};