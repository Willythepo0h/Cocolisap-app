import { ScrollView, StyleSheet , Image, Dimensions, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const screenWidth = Dimensions.get('window').width;

export default function CocolisapInfoScreen() {
    return (
      <ThemedView style={{ flex: 1, padding: 10 }}>
        <ScrollView>
          <ThemedText type='title' style={styles.titleStyle}>What is Cocolisap?</ThemedText>

          <ThemedView style={styles.contentContainer}>
            <ThemedText type='defaultSemiBold'>Aspidiotus Rigidus</ThemedText>

            <ThemedText type='default' style={styles.contentText}>
              Popularly known as “Cocolisap,” is a sap-feeding armored scale insect that can cause 
              devastating damage to coconut trees by extracting nutrients from leaves, stems, and fruits. 
              Severe infestations lead to yellowing, wilting, stunted growth, premature nut fall, and, 
              in extreme cases, tree mortality. This invasive pest spreads rapidly through wind dispersal, 
              human activities, and infested planting materials, posing a significant threat to coconut farms 
              and the livelihoods of farmers.
            </ThemedText>

            <Image source={require('../../assets/images/Aspidiotus_rigidus.jpg')}
              style={styles.contentImage}
            />
            <ThemedText type='link' style={styles.contentLink}
              onPress={()=> Linking.openURL('https://inaturalist.laji.fi/taxa/317911-Aspidiotus')}
              >Source: https://inaturalist.laji.fi</ThemedText>
          </ThemedView>

          <ThemedText type='title' style={styles.titleStyle}>Morphological Characteristics</ThemedText>

          <ThemedView style={styles.contentContainer}>
            <ThemedText type='defaultSemiBold'>Scale Cover:</ThemedText>

            <ThemedText type='default' style={styles.contentText}>
              The protective covering of a rigidus is relatively thick, semi-translucent, 
              and grayish-white in color. This hard, scale-like covering shields the insect 
              from natural predators and environmental factors.
            </ThemedText>

            <ThemedText type='defaultSemiBold'>Egg Deposition:</ThemedText>

            <ThemedText type='default' style={styles.contentText}>
              Females lay eggs beneath their scale cover. The eggs are arranged in a crescent 
              shape on the posterior half of the body.
            </ThemedText>

            <Image source={require('../../assets/images/egg.png')}
              style={styles.contentImage} />

            <ThemedText type='link' style={styles.contentLink}
            onPress={() => Linking.openURL('https://www.researchgate.net/publication/301364751_MORPHOLOGICAL_AND_BEHAVIORAL_CHARACTERISTICS_AS_BASES_FOR_FIELD_IDENTIFICATION_OF_SOME_SPECIES_OF_Aspidiotus_HEMIPTERA_DIASPIDIDAE_ON_COCONUT_IN_THE_PHILIPPINES')}
            >Source (Left Image): https://www.researchgate.net</ThemedText>

            <ThemedText type='link' style={styles.contentLink}
            onPress={() => Linking.openURL('https://entnemdept.ufl.edu/creatures/FRUIT/TROPICAL/coconut_scale.htm')}
            >Source (Right Image): https://entnemdept.ufl.edu</ThemedText>
          </ThemedView>

          <ThemedText type='title' style={styles.titleStyle}>Life Cycle</ThemedText>

          <ThemedView style={styles.contentContainer}>
            <ThemedText type='defaultSemiBold'>Feeding Habits:</ThemedText>

            <ThemedView style={styles.contentBullet}>
              <ThemedText>{'❑'} </ThemedText>
              <ThemedView style={{ flex: 1 }}>  
                <ThemedText type='default' style={styles.contentText}>
                  A rigidus primarily infests the leaves of coconut palms. It is typically found on 
                  fruits only when several fronds are already infested.
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedText type='defaultSemiBold'>Reproduction:</ThemedText>
              <ThemedView style={styles.contentBullet}>
                <ThemedText>{'❑'} </ThemedText>
                <ThemedView style={{ flex: 1 }}>
                  <ThemedText type='default' style={styles.contentText}>
                    Females can reproduce without mating, a process known as parthenogenesis. After laying 
                    eggs under their protective scale, the eggs hatch into "crawlers" (nymphs), which disperse 
                    to new feeding sites before settling and forming their own scales.
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            
            <Image source={require('../../assets/images/scale_life_cycle.jpg')}
              style={styles.contentImage} resizeMode='stretch'/>

            <ThemedText type='link' style={styles.contentLink}
            onPress={() => Linking.openURL('https://apps.lucidcentral.org/pppw_v10/text/web_full/entities/coconut_scale_104.htm')}
            >Source: https://apps.lucidcentral.org</ThemedText>
          </ThemedView>

          <ThemedText type='title' style={styles.titleStyle}>Damage in Agriculture</ThemedText>

          <ThemedView style={styles.contentContainer}>
            <ThemedText type='defaultSemiBold'>Tree Damage and Mortality:</ThemedText>

            <ThemedView style={styles.contentBullet}>
              <ThemedText>{'❑'} </ThemedText>
              <ThemedView style={{ flex: 1 }}>
                <ThemedText type='default' style={styles.contentText}>
                  Cocolisap infestations cause severe damage to coconut trees by feeding on the sap, 
                  leading to the drying and browning of leaves. If left unmanaged, the infestation can 
                  progress until only the trunk remains, rendering the tree beyond recovery. This extensive 
                  damage has resulted in the destruction of millions of coconut trees.
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <Image source={require('../../assets/images/Damage-trees.png')}
              style={styles.contentImage} />

            <ThemedText type='link' style={styles.contentLink}
            onPress={() => Linking.openURL('https://agriculture-ph.blogspot.com/2015/09/govt-to-focus-on-reducing-cocolisap.html')}
            >Source: https://agriculture-ph.blogspot.com</ThemedText>
          </ThemedView>

          <ThemedView style={styles.contentContainer}>
            <ThemedView style={styles.contentBullet}>
              <ThemedText>{'❑'} </ThemedText>
              <ThemedView style={{ flex: 1 }}>
                <ThemedText type='default' style={styles.contentText}>
                  Research studies showed that Cocolisap pest infestation outbreak will most probably occur in
                  areas with favorable climatological factors (high temperature, relative humidity, and
                  wind direction).
                </ThemedText>
              </ThemedView>
              
            </ThemedView>

            <ThemedView style={styles.contentBullet}>
              <ThemedText>{'❑'} </ThemedText>
              <ThemedView style={{ flex: 1 }}>
                <ThemedText type='default' style={styles.contentText}>
                  Early detection and quick response treatment protocol through regular monitoring and
                  surveillance is one of the key strategies in the prevention and control of this pest.
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.contentBullet}>
              <ThemedText>{'❑'} </ThemedText>
              <ThemedView style={{ flex: 1 }}>
                <ThemedText type='default' style={styles.contentText}>
                  Special attention must be given to high-risk areas or areas with high coconut planting density
                  adjacent to CSI-infested areas and the drought-affected areas.
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

        </ScrollView>
      </ThemedView>
    )
};


const styles = StyleSheet.create({
  titleStyle: { marginTop: 10 },
  contentContainer: { padding: 15, borderWidth: 1, borderRadius: 10, marginTop: 10 },
  contentText: { textAlign: 'justify', paddingVertical: 0 },
  contentImage: { 
    alignSelf: 'center', 
    borderWidth: 1, 
    width: screenWidth * 0.90, 
    height: screenWidth * 0.50 },
  contentLink: { fontSize: 12, fontStyle: 'italic', alignSelf: 'center', paddingBottom: 5 },
  contentBullet: { flexDirection: 'row'}
});