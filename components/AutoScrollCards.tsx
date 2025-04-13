import React, { useRef, useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.4;
const SPACING = 10;
const SCROLL_INTERVAL = 3000; 
const INITIAL_OFFSET = (width - CARD_WIDTH) / 2 - SPACING;

type AutoScrollCardsProps = {
  onCardPress: (id: string) => void;
};

const AutoScrollCards: React.FC<AutoScrollCardsProps> = ({ onCardPress }) => {
    const [ isScrolling, setIsScrolling ] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const scrollViewRef = useRef<ScrollView>(null);

    const [cards, setCards] = useState([
        { id: "1", 
            title: "Cocolisap Information", 
            action: () => onCardPress("info"),
            image: require("../assets/images/cocolisap.png"), 
        },
        { id: "2", 
            title: "Cocolisap Management", 
            action: () => onCardPress("manage"),
            image: require("../assets/images/manageIconFinal.png")
        },
        { id: "3", 
            title: "PCA Website", 
            action: () => onCardPress("pca"),
            image: require("../assets/images/pca.png")
        },
    ]);

    useEffect(() => {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ x: INITIAL_OFFSET, animated: false });
        }, 100);
    }, []);

    const startAutoScroll = () => {
        if (intervalRef.current) return; 
        intervalRef.current = setInterval(() => {
          setCards((prevCards) => {
            const newCards = [...prevCards];
            const firstCard = newCards.shift();
            if (firstCard) {
              newCards.push(firstCard);
            }
            return newCards;
          });
    
        scrollViewRef.current?.scrollTo({ x: INITIAL_OFFSET, animated: false });
        }, SCROLL_INTERVAL);
      };
    
      const stopAutoScroll = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    
      useEffect(() => {
        if (!isScrolling) {
          startAutoScroll();
        } else {
          stopAutoScroll();
        }
        return stopAutoScroll;
      }, [isScrolling]);
    
      return (
        <ThemedView style={styles.container}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            contentContainerStyle={styles.scrollContainer}
            onScrollBeginDrag={() => setIsScrolling(true)}
            onScrollEndDrag={() => setIsScrolling(false)}
          >
            {cards.map((card) => (
              <ThemedView key={card.id} style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={card.action}>
                    <Image source={card.image} style={styles.cardImage} />
                </TouchableOpacity>
                <ThemedText style={styles.cardText}>{card.title}</ThemedText>
              </ThemedView>
            ))}
          </ScrollView>
        </ThemedView>
    );
};
     
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  scrollContainer: {
    paddingHorizontal: SPACING,
  },
  cardContainer: {
    alignItems: "center",
    marginHorizontal: SPACING,
  },
  card: {
    width: CARD_WIDTH,
    height: 150,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
    borderWidth: 1,
  },
  cardText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AutoScrollCards;