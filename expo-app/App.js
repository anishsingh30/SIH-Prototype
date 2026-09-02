import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  BackHandler,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';

const getInitialUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:5173/';
  }
  return 'http://192.168.1.8:5173/';
};

export default function App() {
  const [currentUrl, setCurrentUrl] = useState(getInitialUrl);
  const [inputUrl, setInputUrl] = useState(getInitialUrl);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef(null);

  // Handle Android hardware back button
  useEffect(() => {
    if (Platform.OS === 'android') {
      const onBackPress = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }
  }, [canGoBack]);

  const handleApplyUrl = () => {
    let url = inputUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }
    setCurrentUrl(url);
    setShowSettings(false);
  };

  const handleReload = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f2942" />

      {/* Top Mobile App Bar */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>SAMVAAD (संवाद • ᱥᱟᱱᱛᱟᱲᱤ)</Text>
          <Text style={styles.headerSubtitle}>FLN Classroom Companion</Text>
        </View>

        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={handleReload}>
            <Text style={styles.headerButtonText}>🔄 Reload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerButton, styles.settingsButton]}
            onPress={() => setShowSettings(!showSettings)}
          >
            <Text style={styles.headerButtonText}>{showSettings ? '✕ Close' : '⚙ IP'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings / IP Configuration Drawer */}
      {showSettings && (
        <View style={styles.settingsDrawer}>
          <Text style={styles.settingsLabel}>Vite Server URL (on same Wi-Fi):</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={inputUrl}
              onChangeText={setInputUrl}
              placeholder="http://192.168.1.x:5173/"
              placeholderTextColor="#94a3b8"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyUrl}>
              <Text style={styles.applyButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.settingsHint}>
            Make sure your phone and PC are connected to the same Wi-Fi.
          </Text>
        </View>
      )}

      {/* Web View Container */}
      <View style={styles.webviewContainer}>
        {Platform.OS === 'web' ? (
          <iframe
            src={currentUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#f8fafc'
            }}
            title="SAMVAAD Web Preview"
          />
        ) : (
          <WebView
            ref={webViewRef}
            source={{ uri: currentUrl }}
            style={styles.webview}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0f2942" />
                <Text style={styles.loadingText}>Connecting to SAMVAAD FLN Server...</Text>
                <Text style={styles.loadingSubtext}>{currentUrl}</Text>
              </View>
            )}
            renderError={(errorName) => (
              <View style={styles.errorContainer}>
                <Text style={styles.errorTitle}>⚠ Connection Failed</Text>
                <Text style={styles.errorText}>
                  Could not connect to {currentUrl}.
                </Text>
                <Text style={styles.errorHint}>
                  1. Ensure "npm run dev" is running on your PC.{'\n'}
                  2. Confirm phone and PC are on the same Wi-Fi.{'\n'}
                  3. Tap "⚙ IP" above to update your PC's IP address.
                </Text>
                <TouchableOpacity style={styles.retryButton} onPress={handleReload}>
                  <Text style={styles.retryButtonText}>Retry Connection</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2942'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f2942',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e3a5a'
  },
  headerTitleContainer: {
    flex: 1
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  headerSubtitle: {
    color: '#fef3c7',
    fontSize: 11,
    fontWeight: '600'
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  headerButton: {
    backgroundColor: '#1e3a5a',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#33537a'
  },
  settingsButton: {
    backgroundColor: '#c25e00',
    borderColor: '#e07a1e'
  },
  headerButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold'
  },
  settingsDrawer: {
    backgroundColor: '#1c3d5e',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#33537a'
  },
  settingsLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8
  },
  input: {
    flex: 1,
    backgroundColor: '#0f2942',
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#33537a'
  },
  applyButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 6
  },
  applyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12
  },
  settingsHint: {
    color: '#94a3b8',
    fontSize: 10,
    marginTop: 6
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  webview: {
    flex: 1
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  loadingText: {
    marginTop: 12,
    color: '#0f2942',
    fontSize: 14,
    fontWeight: 'bold'
  },
  loadingSubtext: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 11
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  errorTitle: {
    color: '#b91c1c',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  errorText: {
    color: '#334155',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12
  },
  errorHint: {
    color: '#64748b',
    fontSize: 12,
    lineHeight: 18,
    backgroundColor: '#e2e8f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%'
  },
  retryButton: {
    backgroundColor: '#0f2942',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13
  }
});
