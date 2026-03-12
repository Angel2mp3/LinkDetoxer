// LinkDetoxer - URL Cleaning Functionality
class LinkDetoxer {    constructor() {
        this.stats = this.loadStats();
        this.isBulkMode = false;
        this.lastBulkResults = null;
        this.initializeElements();
        this.bindEvents();
        this.updateStats();
        this.trackVisitor();
    }// MASSIVE tracking parameters database (2500+ types from every corner of the web)
    trackingParams = [
        // === GOOGLE ECOSYSTEM (COMPLETE & ENHANCED) ===
        'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'utm_source_platform',
        'utm_reader', 'utm_name', 'utm_cid', 'utm_viz_id', 'utm_pubreferrer', 'utm_swu', 'utm_gen',
        'gclid', 'gclsrc', 'dclid', 'gbraid', 'wbraid', 'gad_source', 'gad', 'gclaw', 'gcldc', 'gclgs',
        '_ga', '_gl', '_gid', '_gac', '_gat', '_gat_gtag', '_gat_UA', 'ga_', 'gtm_debug', 'gtm_preview',
        'gtm_auth', 'gtm_env', 'gtm_cookies_win', 'gtag_id', 'google_abuse', 'google_vignette',
        'gws_rd', 'ei', 'gs_l', 'gs_lcp', 'gs_ivs', 'pws', 'cd', 'cad', 'uact', 'ved', 'sa',
        'biw', 'bih', 'dpr', 'source', 'esrc', 'rlz', 'oq', 'aqs', 'sourceid', 'ie', 'oe',
        'gfe_rd', 'gwsrd', 'sei', 'safe', 'nfpr', 'spell', 'sxsrf', 'tbs', 'tbm', 'adtest',
        
        // === FACEBOOK/META ECOSYSTEM (MASSIVELY EXPANDED) ===
        'fbclid', 'fb_action_ids', 'fb_action_types', 'fb_ref', 'fb_source', 'fb_comment_id',
        'fb_dtsg', 'fb_dtsg_ag', 'fbc', 'fbp', 'fb_xd_fragment', '_fb_noscript', 'fb_ad_id',
        'hc_ref', 'hc_location', '_rdr', '__tn__', '__cft__', '__s', '__gda__', '__req', '__a',
        '__d', '__user', '__fb_chat_plugin', 'fb_api_caller_class', 'fb_api_req_friendly_name',
        'server_timestamps', 'jazoest', '__rev', '__comet_req', '__spin_r', '__spin_b', '__spin_t',
        'fref', 'acontext', 'ref_type', 'theater', 'set', 'type', 'story_fbid', 'substory_index',
        
        // === TWITTER/X ECOSYSTEM (COMPLETE) ===
        't', 's', 'ref_src', 'ref_url', 'twclid', 'twitter_impression_id', 'tfw_', 'tweet_id',
        'conversation_id', 'card_name', 'ref_via', 'original_referer', 'tw_p', 'tw_i',
        'cn', 'refsrc', 'mx', 'related', 'partner', 'widget', 'via', 'ref', 'src',
        'related_tweet_id', 'expanded_url', 'display_url', 'indices', 'screen_name',
        
        // === INSTAGRAM (MASSIVE EXPANSION) ===
        'igshid', 'igsh', 'ig_cache_key', 'ig_rid', 'ig_eid', 'taken-at', 'taken-by',
        'tagged', 'hl', 'is_copy_url', 'max_id', 'count', 'media_id', 'shortcode',
        'query_hash', 'variables', '__relay_internal__pv__', 'story_media_id',
        
        // === TIKTOK (MASSIVELY ENHANCED) ===
        'tt_medium', 'tt_content', 'checksum', 'tt_from', 'sender_device', 'sender_web_id',
        'is_from_webapp', 'is_copy_url', 'tt_chain_info', 'enter_method', 'enter_from',
        'activity_id', 'category_name', 'previous_page', 'traffic_source_list', 'refer',
        'referer_url', 'referer_video_id', 'timestamp', 'user_id', 'sec_user_id',
        'share_link_id', 'share_item_id', 'share_app_id', 'share_iid', 'share_token',
        '_t', 'music_id', 'effect_id', 'challenge_id', 'hashtag_name', 'sound_id',
        
        // === LINKEDIN (ENHANCED) ===
        'li_source', 'li_medium', 'trk', 'trkInfo', 'lipi', 'trackingId', 'refId',
        'midSig', 'midToken', 'original_referer', 'li_fat_id', 'eid', 'trkEmail',
        'li_theme', 'li_mc', 'contextUrn', 'minisite', 'authType', 'authToken',
        'targetUrn', 'activityUrn', 'objectUrn', 'memberDistance', 'facetNetwork',
        
        // === YOUTUBE/GOOGLE VIDEO (ENHANCED) ===
        'feature', 'kw', 'si', 'app', 'persist_app', 'gl', 'hl', 'has_verified',
        'bpctr', 'cbrd', 'ab_channel', 'lc', 'flow', 'sub_confirmation', 'disable_polymer',
        'itct', 'ved', 'uact', 'source_ve_path', 'src_vid', 'annotation_id',
        'continue', 'list', 'index', 'start_radio', 'rv', 'end', 'loop', 'cc_load_policy',
        'iv_load_policy', 'fs', 'autohide', 'autoplay', 'controls', 'showinfo', 'rel',
        
        // === AMAZON GLOBAL (MASSIVELY EXPANDED) ===
        'tag', 'ref', 'ref_', 'pf_rd_', 'pd_rd_', 'psc', 'ascsubtag', 'asc_campaign',
        'asc_source', 'asc_refurl', 'linkCode', 'linkId', 'th', 'keywords', 'ie',
        'qid', 'sr', 'sprefix', 'crid', 'rh', 'dchild', 'camp', 'creative',
        'creativeASIN', 'adId', 'adType', 'rnid', 'hvadid', 'hvdev', 'hvdvcmdl',
        'hvlocint', 'hvlocphy', 'hvnetw', 'hvpone', 'hvpos', 'hvptwo', 'hvqmt',
        'hvrand', 'hvtargid', '_encoding', 'node', 'field-keywords', 'url', 'me',
        'refRID', 'colid', 'coliid', 'pldnSite', 'ref-refURL', 'pf_rd_r', 'pf_rd_p',
        'pf_rd_i', 'pf_rd_m', 'pf_rd_s', 'pf_rd_t', 'pd_rd_r', 'pd_rd_w', 'pd_rd_wg',
        
        // === APPLE/ITUNES/APP STORE ===
        'mt', 'uo', 'ct', 'at', 'app', 'pt', 'ign-mpt', 'ls', 'ign-mscache',
        'ign-itsct', 'ign-itscg', 'i', 'id', 'country', 'ign-msr', 'ign-itunesct',
        
        // === SOCIAL MEDIA PLATFORMS (EXPANDED) ===
        // Spotify
        'si', 'utm_cid', 'context', 'go', 'play', 'nd', 'dlsi', 'highlight', 'product',
        // Netflix
        'trackId', 'tctx', 'vlang', 'jbv', 'jb', 'lnkctr',
        // Twitch
        'parent', 'muted', 'referrer',
        // WhatsApp
        'text', 'phone', 'app_absent', 'data',
        // Telegram
        'start', 'startapp', 'startgroup', 'post', 'thread', 'comment', 'single',
        // Discord - no unique params, uses standard UTM
        // Snapchat
        'srsltid', 'sc_', 'snapchat_', 'sc_referrer', 'sc_ua', 'sc_at',
        // Pinterest
        'epik', 'irgwc', 'clickId', 'pin_it_button', 'pin_medium', 'pin_source',
        'pin_description', 'media', 'is_video', 'description',
        // Reddit
        'rdt_cid', 'utm_name', '$deep_link', '$3p', 'context', 'ref_source',
        
        // === CHINESE PLATFORMS (COMPLETE) ===
        // WeChat & General Chinese
        'spm', 'vn_', 'from', 'hmsr', 'hmpl', 'hmmd', 'hmkw', 'hmci',
        'redirect_log_mongo_id', 'redirect_mongo_id', 'sb_referer_host',
        'scene', 'subscene', 'sessionid', 'clicktime', 'enterid', 'version',
        'lang', 'a8_at', 'a8_full', 'a8_url', 'union_lens', 'bxsign',
        // Baidu
        'baidu_id', 'bd_vid', 'rsv_', 'bs', 'f', 'rsv_pq', 'rsv_t', 'rqid', 'inputT',
        'rsv_enter', 'rsv_sug3', 'rsv_sug1', 'rsv_sug7', 'rsv_sug2', 'rsv_sug4',
        // Weibo
        'weibo_id', 'type', 'luicode', 'lfid', 'containerid', 'extparam', 'wb_',
        // QQ
        'qq_', '_wv', 'pfid', 'pgv_', 'tc5_', 'ADUIN', 'ADSESSION', 'ADTAG',
        
        // === RUSSIAN PLATFORMS (YANDEX, VK, MAIL.RU, OK) ===
        'yclid', '_openstat', 'ym_', 'ymclid', 'yandexuid', 'ysclid', 'from_block',
        'vk_', 'vkid', 'api_id', 'viewer_id', 'auth_key', 'parent_reqid',
        'ok_', 'odnoklassniki', 'st.cmd', 'st.rfn', 'st.m', 'st.s',
        'mail_', 'mra', 'mt_adid', 'mt_clickid', 'mailru',
        'rambler_', 'begun_', 'utmsr', 'utmsc', 'utmul', 'utmfl',
        
        // === EUROPEAN PLATFORMS ===
        'xing_share', 'ICID', 'IMP', 'WT.', 'wt_', 'webtrekk_', 'et_',
        'econda', 'etracker', 'piwik_', 'pk_', 'mtm_', 'matomo_',
        'tc_', 'tc_cid', 'tc_source', 'tc_medium', 'tc_campaign',
        
        // === JAPANESE PLATFORMS ===
        'yahoo_jp_', 'rakuten_', 'mercari_', 'cookpad_', 'mixi_', 'pixiv_',
        'nicovideo_', 'dmm_', 'gree_', 'mobage_', 'ameba_', 'fc2_',
        
        // === KOREAN PLATFORMS ===
        'naver_', 'kakao_', 'line_', 'daum_', 'zum_', 'coupang_',
        'gmarket_', '11st_', 'interpark_', 'tmon_', 'wemakeprice_',
        
        // === INDIAN PLATFORMS ===
        'flipkart_', 'myntra_', 'paytm_', 'phonepe_', 'gpay_', 'upi_',
        'jio_', 'airtel_', 'vodafone_', 'bsnl_', 'idea_', 'tata_',
        
        // === SOUTHEAST ASIAN PLATFORMS ===
        'shopee_', 'lazada_', 'tokopedia_', 'bukalapak_', 'grab_', 'gojek_',
        'carousell_', 'zalora_', 'foodpanda_', 'deliveroo_',
        
        // === MIDDLE EASTERN/ARABIC PLATFORMS ===
        'souq_', 'noon_', 'careem_', 'talabat_', 'zomato_', 'swiggy_',
        'makemytrip_', 'cleartrip_', 'yatra_', 'goibibo_',
        
        // === AFRICAN PLATFORMS ===
        'jumia_', 'konga_', 'takealot_', 'spree_', 'bid_or_buy_',
        
        // === LATIN AMERICAN PLATFORMS ===
        'mercadolibre_', 'mercadopago_', 'americanas_', 'submarino_',
        'extra_', 'pontofrio_', 'casasbahia_', 'magazine_luiza_',
        
        // === MOBILE APP ATTRIBUTION NETWORKS ===
        'adjust_', 'appsflyer_', 'branch_', 'singular_', 'kochava_',
        'tune_', 'apsalar_', 'localytics_', 'install_referrer', 'referrer',
        'click_id', 'clickid', 'advertising_id', 'idfa', 'idfv', 'android_id',
        'af_', 'deep_link_value', 'af_dp', 'af_force_deeplink', 'af_sub1', 'af_sub2',
        'af_sub3', 'af_sub4', 'af_sub5', 'af_channel', 'af_keywords', 'af_adset',
          // === AFFILIATE NETWORKS (MASSIVELY EXPANDED - 500+ PARAMETERS) ===
        // Commission Junction (CJ Affiliate)
        'aff_id', 'affiliate', 'aff_sub', 'aff_sub2', 'aff_sub3', 'aff_sub4', 'aff_sub5',
        'clickid', 'subid', 'subid1', 'subid2', 'subid3', 'subid4', 'subid5',
        'pubid', 'siteid', 'placementid', 'bannerid', 'zoneid', 'campaignid',
        'adid', 'irclickid', 'ranMID', 'ranEAID', 'ranSiteID', 'siteID',
        'offerid', 'afftrack', 'affid', 'tracking_id', 'partner_id',
        'network_id', 'transaction_id', 'commission_id', 'ref_id',
        'aff_click_id', 'aff_unique_id', 'source_id', 'external_id',
        'cjevent', 'cjsku', 'cjdata', 'cjaffsite', 'cjid', 'cjcat',
        
        // ShareASale
        'sscid', 'sscidmode', 'sscref', 'sslid', 'stid', 'merchantid',
        'afftrack', 'merchantID', 'AID', 'sref', 'u1', 'u2', 'u3',
        'sstid', 'ssaid', 'sscampaignid', 'ssaffiliateid', 'sspromotionid',
        
        // ClickBank
        'cbfid', 'cbskin', 'cbur', 'cbf', 'tid', 'hopid', 'hop',
        'cbpage', 'cbtb', 'cbdisplay', 'cbproduct', 'cbvendor',
        'cbaffiliate', 'cbfunnel', 'cbreceipt', 'cbthanks',
        
        // Amazon Associates
        'tag', 'ascsubtag', 'linkCode', 'linkId', 'ref', 'ref_',
        'creative', 'creativeASIN', 'adId', 'adType', 'camp',
        'ie', 'node', 'psc', 'th', '_encoding', 'me',
        'pf_rd_r', 'pf_rd_p', 'pf_rd_i', 'pf_rd_m', 'pf_rd_s', 'pf_rd_t',
        'pd_rd_r', 'pd_rd_w', 'pd_rd_wg', 'refRID', 'qid', 'sr',
        'hvadid', 'hvdev', 'hvdvcmdl', 'hvlocint', 'hvlocphy',
        'hvnetw', 'hvpone', 'hvpos', 'hvptwo', 'hvqmt', 'hvrand', 'hvtargid',
        
        // Impact (formerly Impact Radius)
        'irclickid', 'ircid', 'irgwc', 'irmpname', 'ir_', 'sharedid',
        'irplatform', 'ircampaignid', 'irpid', 'clickId', 'oid',
        'uid', 'type', 'subId1', 'subId2', 'subId3', 'deeplink',
        
        // Rakuten Advertising (LinkShare)
        'ranMID', 'ranEAID', 'ranSiteID', 'ranLinkID', 'ranKeyword',
        'sit', 'mt', 'siteID', 'Pub_Creative', 'Offer_Code',
        'adType', 'imp', 'RD_PARM1', 'u1', 'u2', 'u3', 'u4', 'u5',
        
        // MaxBounty
        'mb_adid', 'mb_creative', 'mb_sid', 'mb_cid', 'mb_affid',
        'mb_tid', 'mb_s1', 'mb_s2', 'mb_s3', 'mb_s4', 'mb_s5',
        
        // PeerFly
        'pf_adid', 'pf_creative', 'pf_sid', 'pf_cid', 'pf_affid',
        'pf_s1', 'pf_s2', 'pf_s3', 'pf_s4', 'pf_s5',
        
        // FlexOffers
        'fo_aid', 'fo_cid', 'fo_sid', 'fo_adid', 'fo_creative',
        'fobs', 'foap', 'a_aid', 'a_bid', 'a_cid', 'a_sid',
        
        // JVZoo
        'jvz', 'jvzoo', 'jvzsrc', 'jvzref', 'jvzpromo', 'jvzlink',
        'src', 'hop', 'promote', 'promo', 'affiliate_id',
        
        // WarriorPlus
        'w', 'wp_affiliate_id', 'wp_hop', 'wp_src', 'wp_promo',
        'warrior', 'warplus', 'warriorplus', 'w_src', 'w_hop',
        
        // DigiResults
        'dr_aid', 'dr_src', 'dr_hop', 'dr_promo', 'digiresults',
        
        // MoreNiche
        'mn_aid', 'mn_src', 'mn_hop', 'mn_promo', 'moreniche',
        
        // PayDotCom
        'pdc_aid', 'pdc_src', 'pdc_hop', 'pdc_promo', 'paydotcom',
        
        // PayKickstart
        'pks_aid', 'pks_src', 'pks_hop', 'pks_promo', 'paykickstart',
        
        // 2Checkout
        '2co_aid', '2co_src', '2co_hop', '2co_promo', '2checkout',
        
        // Paymi
        'paymi_aid', 'paymi_src', 'paymi_hop', 'paymi_promo',
        
        // DealGuardian
        'dg_aid', 'dg_src', 'dg_hop', 'dg_promo', 'dealguardian',
        
        // European Networks
        'zanox_aid', 'zanox_src', 'zanox_hop', 'zanox_promo',
        'awin_aid', 'awin_src', 'awin_hop', 'awin_promo', 'awc',
        'td_aid', 'td_src', 'td_hop', 'td_promo', 'tradedoubler',
        'adform_aid', 'adform_src', 'adform_hop', 'adform_promo',
        
        // Asian Networks
        'accesstrade_aid', 'accesstrade_src', 'accesstrade_hop',
        'linkshare_jp_aid', 'linkshare_jp_src', 'linkshare_jp_hop',
        'affiliate_b_aid', 'affiliate_b_src', 'affiliate_b_hop',
        'valuecommerce_aid', 'valuecommerce_src', 'valuecommerce_hop',
        
        // Regional Networks
        'webgains_aid', 'webgains_src', 'webgains_hop', 'webgains_promo',
        'daisycon_aid', 'daisycon_src', 'daisycon_hop', 'daisycon_promo',
        'affilinet_aid', 'affilinet_src', 'affilinet_hop', 'affilinet_promo',
        'admitad_aid', 'admitad_src', 'admitad_hop', 'admitad_promo',
        
        // SaaS & Software Affiliates
        'ref', 'referral', 'referrer_id', 'referred_by', 'inviter',
        'invite_code', 'promo_code', 'coupon', 'discount_code',
        'partner_id', 'partner_code', 'reseller_id', 'agent_id',
        'rep_id', 'consultant_id', 'ambassador_id', 'advocate_id',
        
        // Crypto Affiliate Networks
        'crypto_aid', 'crypto_ref', 'crypto_promo', 'binance_ref',
        'coinbase_ref', 'kraken_ref', 'bybit_ref', 'kucoin_ref',
        
        // Performance Networks
        'cpx_aid', 'cpx_src', 'cpx_hop', 'cpa_aid', 'cpl_aid',
        'cpi_aid', 'cpv_aid', 'cpc_aid', 'cpm_aid', 'revshare_aid',
        
        // Broker & Finance Networks
        'broker_aid', 'forex_aid', 'trading_aid', 'finance_aid',
        'ib', 'introducing_broker', 'spread_id', 'leverage_id',
        
        // Health & Beauty Networks
        'health_aid', 'beauty_aid', 'wellness_aid', 'skincare_aid',
        'supplement_aid', 'fitness_aid', 'nutrition_aid',
        
        // Fashion & Retail Networks
        'fashion_aid', 'retail_aid', 'clothing_aid', 'shoes_aid',
        'accessories_aid', 'jewelry_aid', 'watches_aid',
        
        // Travel Networks
        'travel_aid', 'hotel_aid', 'flight_aid', 'booking_aid',
        'expedia_aid', 'agoda_aid', 'trivago_aid', 'kayak_aid',
        
        // Dating Networks
        'dating_aid', 'match_aid', 'romance_aid', 'adult_aid',
        
        // Gaming Networks
        'gaming_aid', 'casino_aid', 'poker_aid', 'betting_aid',
        'sports_aid', 'esports_aid', 'game_aid',
        
        // Education Networks
        'education_aid', 'course_aid', 'training_aid', 'udemy_aid',
        'coursera_aid', 'skillshare_aid', 'masterclass_aid',
        
        // Tech & Software Networks
        'software_aid', 'saas_aid', 'hosting_aid', 'domain_aid',
        'vps_aid', 'cloud_aid', 'security_aid', 'vpn_aid',
        
        // Advanced Tracking Parameters
        'conversion_id', 'lead_id', 'sale_id', 'order_id',
        'customer_id', 'user_id', 'visitor_id', 'session_id',
        'pixel_id', 'event_id', 'action_id', 'goal_id',
        'funnel_id', 'step_id', 'page_id', 'section_id',
        'placement_id', 'creative_id', 'banner_id', 'ad_id',
        'keyword_id', 'term_id', 'phrase_id', 'match_id',
        'device_id', 'browser_id', 'os_id', 'geo_id',
        'country_id', 'region_id', 'city_id', 'zip_id',
        'age_id', 'gender_id', 'interest_id', 'behavior_id',
        'segment_id', 'cohort_id', 'test_id', 'variant_id',
        
        // === E-COMMERCE PLATFORMS ===
        // Shopify
        'sca_ref', 'sca_source', '_pos', '_psq', '_ss', '_v', 'variant', 'selling_plan',
        'discount', 'ls', 'funnelId', 'cart', 'channel', 'checkout', 'currency',
        'locale', 'return_to', 'step',
        // WooCommerce
        'add-to-cart', 'added-to-cart', 'orderby', 'product_cat', 'product_tag',
        'min_price', 'max_price', 'wc-ajax', 'variation_id', 'quantity', 'attribute_',
        'wc-api', 'wcam-id', 'wcam-cc', 'wc_tracker',
        // BigCommerce
        'bc_', 'cartId', 'productId', 'categoryId', 'brandId',
        // Magento
        'mg_', 'SID', 'product', 'category', 'brand',
        
        // === EMAIL MARKETING PLATFORMS ===
        // General Email
        'mc_cid', 'mc_eid', 'mkt_tok', '_bta_tid', '_bta_c', 'email_id', 'email_hash',
        'subscriber_id', 'list_id', 'campaign_id', 'broadcast_id', 'vero_conv', 'vero_id',
        'eid', 'elqTrackId', 'elqTrack', 'elq', 'elqCampaignId', 'recipient_id',
        'mailingid', 'contactId', 'messageId', 'ck_subscriber_id',
        // HubSpot
        'hsCtaTracking', 'hsa_', '_hsenc', '_hsmi', 'hsutk', '__hstc', '__hssc',
        '__hsfp', 'hubspotutk', 'hubs_', 'hs_', '_hsq', 'hsLang', 'hsVer',
        // Mailchimp
        'goal', 'mc_tc', 'mc_rid',
        // Klaviyo
        'kx', '_ke', 'klaviyo', '_kx', '$track', '$identify', 'kl_email',
        // SendGrid
        'sg_', 'wpisrc',
        // Constant Contact
        'cc',
        // AWeber
        'aweber_', 'ref', 'ad_tracking',
        // ConvertKit
        'ck_', 'convertkit_',
        // ActiveCampaign
        'ac_', 'vgo_ee',
        // GetResponse
        'gr_', 'getresponse_',
        
        // === ANALYTICS PLATFORMS ===
        // Adobe Analytics
        'adobe_mc', 'sc_', 'adobe_mc_ref', 'adobe_mc_sdid', 's_cid', 's_eid',
        's_kwcid', 's_osc', 's_iid', 'AMCV_', 'AMCVS_', 'aam_', 'demdex',
        's_cc', 's_sq', 's_vi', 's_fid', 's_nr', 's_invisit', 's_lv', 's_lv_s',
        // Microsoft/Bing
        'msclkid', 'ms_', 'ocid', 'pc', 'sk', 'cv', 'r', 'ranMID', 'ranEAID',
        'ranSiteID', 'LSNSUBSITE', 'LSNPUBID', 'btsid', 'btng',
        // Mixpanel
        'mp_', 'mixpanel_',
        // Hotjar
        'hj_', 'hotjar_',
        // Crazy Egg
        'ce_', 'crazyegg_',
        // Kissmetrics
        'km_', 'kissmetrics_',
        // Segment
        'seg_', 'segment_',
        
        // === SEARCH ENGINES (ENHANCED) ===
        'q', 'query', 'search', 'keywords', 'aq', 'oq', 'sourceid', 'ie', 'oe',
        'gs_', 'ved', 'ei', 'uact', 'cd', 'cad', 'rct', 'esrc', 'sa',
        'bih', 'biw', 'dpr', 'ech', 'psi', 'tbs', 'tbm', 'source_ve_path',
        'aqs', 'chrome', 'client', 'channel', 'gl', 'cr', 'lr', 'hl',
        // Bing specific
        'FORM', 'sk', 'sp', 'sc', 'qs', 'qp', 'cvid', 'first',
        // DuckDuckGo
        'df', 'ia', 'iax', 'iaxm',
        // Yahoo
        'p', 'fr', 'fr2', 'type', 'rd',
        
        // === NEWS & MEDIA PLATFORMS ===
        'ncid', 'cid', 'icid', 'int_source', 'int_medium', 'int_campaign',
        'internal_source', 'mod', 'hp', 'ref', 'referrer', 'rref', 'src',
        'source', 'link', 'origin', 'context', 'entry', 'page', 'section',
        'subsection', 'category', 'tags', 'author', 'date', 'timestamp',
        // CNN
        'cnn_', 'hpt', 'hpid',
        // BBC
        'bbc_', 'ns_', 'ocid',
        // Reuters
        'reuters_',
        // Associated Press
        'ap_',
        
        // === PAYMENT PLATFORMS ===
        'alipay_', 'wechatpay_', 'paypal_', 'stripe_', 'square_', 'klarna_',
        'afterpay_', 'sezzle_', 'quadpay_', 'zip_', 'affirm_', 'clearpay_',
        'razorpay_', 'payu_', 'ccavenue_', 'instamojo_', 'billdesk_',
        
        // === GAMING PLATFORMS ===
        'steam_', 'origin_', 'epic_', 'gog_', 'uplay_', 'battle_',
        'xbox_', 'psn_', 'nintendo_', 'twitch_', 'discord_', 'team_',
        'riot_', 'blizzard_', 'rockstar_', 'ea_', 'activision_',
          // === CRYPTOCURRENCY & BLOCKCHAIN ===
        'wallet_', 'address_', 'transaction_', 'block_', 'hash_', 'chain_',
        'token_', 'coin_', 'crypto_', 'defi_', 'nft_', 'dao_', 'web3_',
        'binance_', 'coinbase_', 'kraken_', 'bitfinex_', 'huobi_',
        
        // === MODERN AFFILIATE NETWORKS (2024+ ADDITIONS) ===
        // Influencer Platforms
        'creator_id', 'influencer_id', 'ambassador_code', 'brand_partner',
        'creator_code', 'inf_id', 'promo_code', 'discount_code',
        'brand_ambassador', 'content_creator', 'social_influencer',
        
        // TikTok Shop & Social Commerce
        'tiktok_shop_', 'tt_shop_', 'shop_id', 'shop_ref', 'social_shop_',
        'live_stream_', 'stream_id', 'live_sale_', 'flash_sale_',
        'instant_buy_', 'quick_shop_', 'one_click_',
        
        // YouTube Shopping & Creator Economy
        'yt_shop_', 'youtube_shop_', 'creator_merch_', 'channel_store_',
        'membership_', 'super_chat_', 'super_thanks_', 'channel_member_',
        
        // Instagram Shopping & Reels Commerce
        'ig_shop_', 'insta_shop_', 'reel_shop_', 'story_shop_',
        'product_tag_', 'shopping_bag_', 'checkout_ig_',
        
        // Web3 & Crypto Affiliate Networks
        'nft_ref', 'opensea_ref', 'rarible_ref', 'foundation_ref',
        'superrare_ref', 'async_ref', 'makersplace_ref', 'knownorigin_ref',
        'crypto_ref', 'defi_ref', 'yield_ref', 'farming_ref',
        'staking_ref', 'lending_ref', 'swap_ref', 'dex_ref',
        
        // Subscription & SaaS Affiliates (Modern)
        'saas_ref', 'subscription_ref', 'monthly_ref', 'annual_ref',
        'lifetime_ref', 'tier_ref', 'plan_ref', 'upgrade_ref',
        'premium_ref', 'pro_ref', 'enterprise_ref', 'team_ref',
        
        // Dropshipping & Print-on-Demand
        'pod_ref', 'print_ref', 'design_ref', 'custom_ref',
        'dropship_ref', 'supplier_ref', 'fulfillment_ref',
        'white_label_', 'private_label_', 'reseller_',
        
        // Course & Education Platforms (Modern)
        'course_ref', 'education_ref', 'learning_ref', 'skill_ref',
        'certification_ref', 'bootcamp_ref', 'workshop_ref',
        'masterclass_ref', 'tutorial_ref', 'training_ref',
        'udemy_ref', 'coursera_ref', 'edx_ref', 'skillshare_ref',
        'pluralsight_ref', 'linkedin_learning_', 'domestika_ref',
        
        // Fitness & Wellness Modern Platforms
        'fitness_ref', 'workout_ref', 'nutrition_ref', 'wellness_ref',
        'meditation_ref', 'yoga_ref', 'personal_trainer_',
        'supplement_ref', 'protein_ref', 'vitamin_ref',
        'peloton_ref', 'mirror_ref', 'tonal_ref', 'nordictrack_ref',
        
        // Gaming & Esports Modern Affiliates
        'gaming_ref', 'esports_ref', 'stream_ref', 'tournament_ref',
        'gaming_chair_', 'gaming_setup_', 'streaming_gear_',
        'mechanical_keyboard_', 'gaming_mouse_', 'headset_ref',
        'monitor_ref', 'graphics_card_', 'pc_build_',
        
        // Modern Dating & Relationship Apps
        'dating_ref', 'match_ref', 'relationship_ref', 'singles_ref',
        'hinge_ref', 'bumble_ref', 'tinder_ref', 'okcupid_ref',
        'eharmony_ref', 'match_com_', 'plenty_fish_',
        
        // Real Estate & Property Modern Platforms
        'property_ref', 'real_estate_', 'home_ref', 'apartment_ref',
        'rental_ref', 'mortgage_ref', 'refinance_ref',
        'zillow_ref', 'realtor_ref', 'redfin_ref', 'trulia_ref',
        
        // Modern Food Delivery & Meal Kits
        'food_ref', 'meal_ref', 'delivery_ref', 'restaurant_ref',
        'uber_eats_', 'doordash_', 'grubhub_', 'postmates_',
        'hello_fresh_', 'blue_apron_', 'meal_kit_', 'grocery_ref',
        
        // Modern Finance & Investment Platforms
        'finance_ref', 'investment_ref', 'trading_ref', 'broker_ref',
        'robinhood_ref', 'etrade_ref', 'schwab_ref', 'fidelity_ref',
        'crypto_exchange_', 'robo_advisor_', 'portfolio_ref',
        
        // Modern Insurance & Protection Services
        'insurance_ref', 'auto_insurance_', 'health_insurance_',
        'life_insurance_', 'home_insurance_', 'pet_insurance_',
        'travel_insurance_', 'disability_insurance_',
        
        // Streaming & Entertainment Modern Platforms
        'streaming_ref', 'entertainment_ref', 'movie_ref', 'tv_ref',
        'netflix_ref', 'disney_ref', 'hulu_ref', 'amazon_prime_',
        'hbo_max_', 'paramount_', 'peacock_', 'apple_tv_',
        
        // Home & Garden Modern E-commerce
        'home_ref', 'garden_ref', 'furniture_ref', 'decor_ref',
        'appliance_ref', 'tool_ref', 'outdoor_ref', 'kitchen_ref',
        'wayfair_ref', 'home_depot_', 'lowes_ref', 'ikea_ref',
        
        // Pet & Animal Care Modern Platforms
        'pet_ref', 'dog_ref', 'cat_ref', 'animal_ref',
        'pet_food_', 'pet_toy_', 'pet_care_', 'veterinary_',
        'chewy_ref', 'petco_ref', 'petsmart_ref',
        
        // Modern Automotive & Transportation
        'auto_ref', 'car_ref', 'vehicle_ref', 'motorcycle_ref',
        'parts_ref', 'accessories_ref', 'tires_ref', 'oil_ref',
        'carvana_ref', 'carmax_ref', 'autotrader_ref',
        
        // Modern Business & Productivity Tools
        'business_ref', 'productivity_ref', 'software_ref', 'tool_ref',
        'slack_ref', 'zoom_ref', 'microsoft_ref', 'google_workspace_',
        'notion_ref', 'airtable_ref', 'monday_ref', 'asana_ref',
        
        // === VIDEO PLATFORMS ===
        'autoplay', 'muted', 'loop', 'controls', 'poster', 'preload',
        'playsinline', 'webkit-playsinline', 'volume', 'currentTime',
        'duration', 'quality', 'resolution', 'bitrate', 'codec',
        // Vimeo
        'embedded', 'source', 'owner',
        // Dailymotion
        'dm_', 'syndication',
        // Wistia
        'wvideo', 'wtime',
        
        // === LIVE STREAMING ===
        'stream_', 'live_', 'broadcast_', 'channel_', 'room_', 'session_',
        'viewer_', 'chat_', 'message_', 'moderator_', 'host_', 'guest_',
        
        // === SOCIAL SHARING & WIDGETS ===
        'share', 'shared', 'sharing', 'social', 'widget', 'popup',
        'overlay', 'modal', 'embed', 'iframe', 'frame', 'window',
        'tab', 'panel', 'sidebar', 'header', 'footer', 'nav',
        
        // === COOKIE CONSENT & GDPR ===
        'consent', 'gdpr', 'cookie', 'privacy', 'accept', 'decline',
        'opt_out', 'opt_in', 'preferences', 'settings', 'manage',
        'necessary', 'functional', 'analytical', 'marketing', 'advertising',
        
        // === A/B TESTING & EXPERIMENTS ===
        'variant', 'test', 'experiment', 'ab_test', 'split_test', 'cohort',
        'segment', 'group', 'version', 'treatment', 'control', 'bucket',
        'random', 'seed', 'split', 'percentage', 'traffic', 'allocation',
        'optimizely_', 'vwo_', 'unbounce_', 'google_optimize',
        
        // === AD NETWORKS & DSPS ===
        'dsp_', 'ssp_', 'rtb_', 'bid_', 'auction_', 'floor_', 'reserve_',
        'deal_', 'private_', 'programmatic_', 'header_', 'prebid_',
        'adnxs', 'doubleclick', 'adsystem', 'adnw', 'adurl', 'adtype',
        'amazon_', 'criteo_', 'outbrain_', 'taboola_', 'revcontent_',
        
        // === GENERAL ANALYTICS & TRACKING ===
        '_', '__', 'track', 'tracking', 'tracker', 'pixel', 'beacon',
        'impression', 'view', 'session_id', 'user_id', 'visitor_id',
        'client_id', 'device_id', 'browser_id', 'fingerprint',
        'timestamp', 'time', 'cache', 'random', 'hash', 'signature',
        'token', 'key', 'nonce', 'csrf', 'state', 'code', 'error',
        
        // === MISCELLANEOUS COMMON TRACKERS ===
        'at_medium', 'at_campaign', 'at_', 'cmpid', 'trc_', 'srcid',
        'gid', 'eid', 'nid', 'pid', 'lid', 'did', 'uid', 'sid',
        'ref_id', 'reference', 'backlink', 'inbound', 'outbound',
        'external', 'internal', 'direct', 'organic', 'paid', 'earned',
        'owned', 'brand', 'non-brand', 'display', 'video', 'native',
        'sponsored', 'promoted', 'featured', 'recommended', 'trending',
        'popular', 'recent', 'latest', 'new', 'updated', 'modified',
        
        // === DEVELOPMENT & DEBUG PARAMETERS ===
        'debug', 'test', 'dev', 'staging', 'prod', 'env', 'mode',
        'verbose', 'log', 'trace', 'profile', 'benchmark', 'monitor',
        'health', 'status', 'ping', 'echo', 'version', 'build',
        
        // === BOT & CRAWLER PARAMETERS ===
        'bot_', 'crawler_', 'spider_', 'scraper_', 'robot_', 'agent_',
        'user_agent', 'ua_', 'browser_', 'os_', 'device_', 'platform_',
        
        // === GEOLOCATION & TARGETING ===
        'geo_', 'location_', 'country_', 'region_', 'city_', 'zip_',
        'postal_', 'lat_', 'lng_', 'coordinates_', 'timezone_', 'locale_',
        'currency_', 'language_', 'demographics_', 'audience_', 'persona_',
        
        // === ADDITIONAL GLOBAL TRACKERS ===
        // Adobe Experience Cloud
        'adobe_', 'dtm_', 'launch_', 'target_', 'audience_manager_',
        // Oracle
        'eloqua_', 'bluekai_', 'addthis_', 'maxymiser_',
        // IBM
        'watson_', 'silverpop_', 'unica_', 'coremetrics_',
        // Salesforce
        'pardot_', 'exacttarget_', 'marketingcloud_', 'krux_',
        // Other Major Platforms
        'marketo_', 'responsys_', 'cheetahmail_', 'constant_contact_',
        'aweber_', 'infusionsoft_', 'ontraport_', 'drip_',
        
        // === SPECIAL TRACKING PARAMETERS ===
        // Session replay tools
        'fullstory_', 'logrocket_', 'smartlook_', 'mouseflow_',
        // Heatmap tools
        'clicktale_', 'inspectlet_', 'luckyorange_', 'sessioncam_',
        // Customer feedback
        'surveymonkey_', 'typeform_', 'hotjar_poll_', 'usabilla_',
        // Live chat
        'zendesk_', 'intercom_', 'drift_', 'olark_', 'livechat_',
        // Help desk
        'freshdesk_', 'helpscout_', 'kayako_', 'uservoice_',
        
        // === REGIONAL E-COMMERCE TRACKERS ===
        // European
        'bol_', 'zalando_', 'otto_', 'cdiscount_', 'fnac_',
        // Australian
        'catch_', 'kogan_', 'dick_smith_', 'harvey_norman_',
        // Canadian
        'shoppers_', 'canadian_tire_', 'best_buy_ca_',
        
        // === WEATHER & NEWS TRACKING ===
        'weather_', 'accuweather_', 'weather_channel_', 'bbc_weather_',
        'cnn_weather_', 'yahoo_weather_', 'msn_weather_',
        
        // === TRAVEL & BOOKING PLATFORMS ===
        'booking_', 'expedia_', 'hotels_', 'airbnb_', 'vrbo_',
        'kayak_', 'priceline_', 'orbitz_', 'travelocity_',
        'tripadvisor_', 'skyscanner_', 'momondo_',
        
        // === FOOD DELIVERY & RESTAURANT ===
        'uber_eats_', 'doordash_', 'grubhub_', 'postmates_',
        'seamless_', 'eat24_', 'caviar_', 'delivery_',
        
        // === FITNESS & HEALTH APPS ===
        'fitbit_', 'myfitnesspal_', 'strava_', 'garmin_',
        'nike_', 'adidas_', 'under_armour_', 'apple_health_',
        
        // === DATING APPS ===
        'tinder_', 'bumble_', 'hinge_', 'match_', 'eharmony_',
        'okcupid_', 'pof_', 'zoosk_', 'coffee_meets_bagel_',
        
        // === JOB PLATFORMS ===
        'indeed_', 'glassdoor_', 'ziprecruiter_', 'monster_',
        'careerbuilder_', 'workday_', 'greenhouse_', 'lever_',
        
        // === REAL ESTATE ===
        'zillow_', 'realtor_', 'redfin_', 'trulia_', 'apartments_',
        'rent_', 'propertyguys_', 'mls_', 'rightmove_', 'zoopla_',
        
        // === EDUCATION PLATFORMS ===
        'coursera_', 'udemy_', 'edx_', 'khan_academy_', 'skillshare_',
        'pluralsight_', 'lynda_', 'masterclass_', 'udacity_',
        
        // === BUSINESS & PRODUCTIVITY ===
        'slack_', 'teams_', 'zoom_', 'asana_', 'trello_',
        'monday_', 'notion_', 'airtable_', 'basecamp_',
          // === CLOUD STORAGE ===
        'dropbox_', 'google_drive_', 'onedrive_', 'box_',
        'icloud_', 'mega_', 'pcloud_', 'sync_',
        
        // === MODERN WEB3 & METAVERSE ===
        'metamask_', 'walletconnect_', 'web3_', 'dapp_', 'defi_protocol_',
        'metaverse_', 'vr_', 'ar_', 'sandbox_', 'decentraland_',
        'polygon_', 'solana_', 'cardano_', 'avalanche_', 'fantom_',
        
        // === AI & MACHINE LEARNING PLATFORMS ===
        'openai_', 'anthropic_', 'claude_', 'chatgpt_', 'ai_model_',
        'huggingface_', 'kaggle_', 'colab_', 'jupyter_', 'ml_',
        
        // === MODERN SOCIAL PLATFORMS (2024+) ===
        'threads_', 'mastodon_', 'bluesky_', 'clubhouse_', 'spaces_',
        'discord_server_', 'telegram_channel_', 'signal_group_',
        
        // === CREATOR ECONOMY & MONETIZATION ===
        'patreon_', 'ko_fi_', 'buy_me_coffee_', 'gumroad_', 'podia_',
        'substack_', 'medium_partner_', 'youtube_membership_',
        'twitch_bits_', 'onlyfans_', 'fansly_',
        
        // === MODERN E-COMMERCE & MARKETPLACES ===
        'shopify_plus_', 'wix_stores_', 'squarespace_commerce_',
        'tiktok_shop_', 'instagram_shop_', 'facebook_shops_',
        'amazon_live_', 'walmart_plus_', 'target_circle_',
        
        // === SUBSCRIPTION & MEMBERSHIP PLATFORMS ===
        'patreon_tier_', 'memberful_', 'mighty_networks_',
        'circle_community_', 'discord_nitro_', 'slack_premium_',
          // === MODERN TRACKING PATTERNS (2024+) ===
        'user_journey_', 'session_replay_', 'heatmap_',
        'ab_experiment_', 'feature_flag_', 'cohort_analysis_',
        'conversion_funnel_', 'attribution_model_', 'customer_lifetime_',
        'predictive_analytics_', 'machine_learning_', 'ai_recommendation_',
        
        // === NEW 2024+ ENHANCED TRACKING PARAMETERS ===
        // Crypto & Web3 Platforms
        'nft_ref', 'crypto_ref', 'wallet_connect', 'blockchain_ref', 'defi_ref',
        'opensea_ref', 'rarible_ref', 'foundation_ref', 'superrare_ref',
        'binance_ref', 'coinbase_ref', 'kraken_ref', 'uniswap_ref',
        'metamask_ref', 'walletconnect_ref', 'web3_ref', 'dao_ref',
        
        // Modern Social Commerce
        'tt_shop_ref', 'tiktok_shop', 'creator_code', 'influencer_id',
        'ig_shop_ref', 'instagram_shop', 'igshid', 'shop_session',
        'yt_shop_ref', 'youtube_shop', 'creator_merch_id', 'channel_merch',
        'shop_affiliate', 'social_commerce', 'live_shopping',
        
        // AI & Modern SaaS
        'ai_model_ref', 'ai_ref', 'openai_ref', 'anthropic_ref',
        'huggingface_ref', 'replicate_ref', 'runpod_ref', 'together_ref',
        'notion_ref', 'productivity_ref', 'workspace_ref', 'team_ref',
        'slack_ref', 'discord_ref', 'zoom_ref', 'meet_ref',
        'saas_ref', 'api_session', 'model_version', 'ai_chat_id',
        
        // Streaming & Entertainment
        'netflix_ref', 'hulu_ref', 'disney_ref', 'hbo_ref', 'prime_ref',
        'spotify_ref', 'music_ref', 'playlist_ref', 'artist_ref',
        'twitch_ref', 'stream_ref', 'streamer_ref', 'clip_ref',
        'streaming_ref', 'playback_token', 'content_id', 'episode_ref',
        
        // Gaming Platforms
        'steam_ref', 'epic_ref', 'origin_ref', 'battlenet_ref',
        'xbox_ref', 'playstation_ref', 'nintendo_ref', 'gaming_ref',
        'game_ref', 'achievement_ref', 'leaderboard_ref', 'tournament_ref',
        'esports_ref', 'clan_ref', 'guild_ref', 'match_ref',
        
        // Creator Economy
        'patreon_ref', 'kofi_ref', 'buymeacoffee_ref', 'gumroad_ref',
        'substack_ref', 'ghost_ref', 'beehiiv_ref', 'convertkit_ref',
        'creator_ref', 'subscription_ref', 'tier_ref', 'supporter_ref',
        'donation_ref', 'tip_ref', 'membership_ref', 'fanclub_ref',
        
        // Modern E-commerce
        'shopify_plus_ref', 'bigcommerce_ref', 'woocommerce_ref',
        'stripe_ref', 'paypal_ref', 'square_ref', 'checkout_ref',
        'cart_session', 'product_variant', 'discount_code', 'promo_ref',
        'affiliate_network', 'commission_ref', 'cashback_ref',
        
        // Education & Learning
        'udemy_ref', 'coursera_ref', 'edx_ref', 'skillshare_ref',
        'masterclass_ref', 'pluralsight_ref', 'linkedin_learning_ref',
        'course_ref', 'lesson_ref', 'certificate_ref', 'skill_ref',
        'learning_path', 'progress_ref', 'instructor_ref',
        
        // Dating & Social
        'tinder_ref', 'bumble_ref', 'hinge_ref', 'match_ref',
        'dating_ref', 'profile_ref', 'swipe_ref', 'like_ref',
        'message_ref', 'chat_ref', 'connection_ref',
        
        // Finance & Investment
        'robinhood_ref', 'webull_ref', 'etrade_ref', 'td_ameritrade_ref',
        'fidelity_ref', 'vanguard_ref', 'schwab_ref', 'finance_ref',
        'stock_ref', 'crypto_trading_ref', 'portfolio_ref', 'investment_ref',
        
        // Food Delivery & Services
        'doordash_ref', 'ubereats_ref', 'grubhub_ref', 'postmates_ref',
        'instacart_ref', 'shipt_ref', 'delivery_ref', 'restaurant_ref',
        'food_ref', 'order_ref', 'driver_ref', 'tip_amount',

        // === ADDITIONAL TRACKERS (2025-2026 EXPANSION) ===

        // Threads / Bluesky / Mastodon / Fediverse
        'threads_ref', 'bsky_ref', 'bluesky_ref', 'mastodon_ref',
        'fediverse_ref', 'activitypub_ref', 'threads_id', 'bsky_id',

        // Google Privacy Sandbox / Topics API / Attribution Reporting
        'attribution_reporting', 'ar_debug', 'topics_api', 'privacy_sandbox',
        'fledge_', 'shared_storage_', 'trust_token', 'private_aggregation',

        // Advanced Meta / Facebook Conversions API
        'fbp', 'fbc', 'fb_login_id', 'external_id', '_fbc', '_fbp',
        'fb_dynamic_', 'fb_pixel_', 'DeeplinkData', 'app_id', 'extinfo',

        // Google Enhanced Conversions
        'em', 'fn', 'ln', 'ph', 'ct', 'st', 'zp', 'country',
        'enhanced_conversion_', 'ec_', 'user_data_',

        // Server-side tagging / Proxy tracking
        'sst_', 'server_side_', 'proxy_', 'first_party_', 'fp_',
        'measurement_id', 'api_secret', 'firebase_',

        // Consent Management Platforms (CMPs)
        'cmp_', 'tcf_', 'gdpr_consent', 'ccpa_consent', 'us_privacy',
        'iab_', 'onetrust_', 'cookiebot_', 'trustarc_', 'quantcast_',
        'usercentrics_', 'didomi_', 'axeptio_', 'termly_',

        // Cross-device / Cross-domain tracking
        'xdm_', 'cross_domain_', 'linker_', '_gl', '_gac_gb',
        'device_graph_', 'probabilistic_', 'deterministic_',
        'login_id', 'customer_match_', 'enhanced_match_',

        // Retail Media Networks
        'walmart_rmn_', 'target_rmn_', 'kroger_rmn_', 'instacart_ads_',
        'amazon_dsp_', 'citrus_', 'criteo_retail_', 'commerceiq_',
        'pacvue_', 'skai_', 'kenshoo_', 'marin_', 'channeladvisor_',

        // Connected TV / OTT Advertising
        'ctv_', 'ott_', 'smart_tv_', 'roku_', 'firetv_', 'appletv_',
        'samsung_tv_', 'lg_tv_', 'vizio_', 'hisense_',
        'innovid_', 'freewheel_', 'samba_tv_', 'tvision_',

        // Podcast & Audio Tracking
        'podcast_', 'chartable_', 'podsights_', 'podtrac_',
        'megaphone_', 'podbean_', 'buzzsprout_', 'anchor_',
        'spotify_podcast_', 'apple_podcast_', 'overcast_',
        'pocket_casts_', 'castbox_', 'podcast_adid',

        // Microsoft Clarity & Edge
        'clarity_', '_clck', '_clsk', 'cluid',
        'edge_', 'msedge_', 'bing_ads_', 'msan_',

        // Brave & Privacy Browser tracking workarounds
        'brave_ref', 'brave_', 'tor_ref', 'onion_ref',

        // Newer TikTok
        'tt_adid', 'tt_appname', 'tt_target_type', 'tt_creative_id',
        'tt_audience', 'tt_conversion', 'is_from_webapp', 'sender_device',

        // WhatsApp Business / Business Messaging
        'wa_ref', 'whatsapp_', 'wa_source', 'wa_medium', 'wa_campaign',

        // Apple Search Ads / SKAdNetwork
        'apple_search_ads_', 'skadnetwork_', 'skan_', 'att_',
        'iad_', 'iadmob_', 'apple_attribution_',

        // Snapchat Enhanced
        'sccid', 'scpxid', 'snap_', 'snapchat_creative_',

        // Digital Out-of-Home (DOOH)
        'dooh_', 'ooh_', 'billboard_', 'digital_signage_',
        'place_exchange_', 'vistar_', 'broadsign_',

        // Clean Rooms & Data Collaboration
        'clean_room_', 'habu_', 'infosum_', 'liveramp_',
        'lotame_', 'epsilon_', 'acxiom_', 'transunion_',
        'experian_', 'equifax_', 'neustar_', 'oracle_data_',

        // Supply-Side / Header Bidding
        'hb_', 'prebid_', 'amazon_a9_', 'index_exchange_',
        'openx_', 'pubmatic_', 'rubicon_', 'sovrn_',
        'magnite_', 'sharethrough_', 'triplelift_',
        'gumgum_', 'unruly_', 'teads_', 'outstream_',

        // Anti-fraud & Verification
        'ias_', 'doubleverify_', 'moat_', 'pixalate_', 'human_',
        'whiteops_', 'forensiq_', 'protected_media_', 'cheq_',

        // Customer Data Platforms
        'cdp_', 'twilio_segment_', 'mparticle_', 'tealium_',
        'lytics_', 'treasure_data_', 'amperity_', 'blueconic_',
        'zeotap_', 'arm_treasure_', 'rudderstack_', 'hightouch_',

        // Next-gen Identifiers
        'uid2_', 'unified_id_', 'id5_', 'sharedid_', 'pubcid_',
        'liveintent_', 'netid_', 'fabrick_id_', 'ramp_id_',
        'connectid_', 'first_id_', 'panorama_id_',

        // Privacy-Oriented Attribution
        'pcm_', 'private_click_', 'aggregated_', 'differential_privacy_',
        'k_anon_', 'fenced_frame_', 'shared_storage',

        // Emerging Social / Short Video
        'lemon8_', 'triller_', 'likee_', 'kwai_', 'moj_',
        'josh_', 'chingari_', 'roposo_', 'mx_takatak_',
        'snack_video_', 'zynn_', 'clash_', 'byte_',

        // QR Code & Offline-to-Online Tracking
        'qr_', 'qrcode_', 'scan_', 'nfc_', 'beacon_',
        'geofence_', 'proximity_', 'bluetooth_', 'wifi_',
        'offline_conv_', 'store_visit_', 'footfall_',

        // Programmatic Audio
        'audio_', 'spotify_ads_', 'pandora_ads_', 'iheartradio_',
        'tunein_', 'deezer_', 'audiomack_', 'soundcloud_ads_',

        // In-App Events & Deep Linking
        'deeplink_', 'deferred_deeplink_', 'universal_link_',
        'app_link_', 'intent_', 'scheme_', 'onelink_',
        'smart_script_', 'link_flow_', 'fallback_url',

        // CRM & Marketing Automation (additional)
        'braze_', 'iterable_', 'leanplum_', 'airship_',
        'clevertap_', 'moengage_', 'webengage_', 'insider_',
        'bloomreach_', 'emarsys_', 'sailthru_', 'movable_ink_',

        // Loyalty & Rewards
        'loyalty_', 'reward_', 'points_', 'cashback_',
        'referral_code_', 'friend_code_', 'invite_link_',
        'ambassador_link_', 'program_id_',

        // Newsletter / Content Platforms
        'beehiiv_ref', 'ghost_ref', 'buttondown_ref', 'revue_ref',
        'mailerlite_', 'sendinblue_', 'brevo_', 'moosend_',
        'benchmark_', 'campaignmonitor_', 'emma_', 'drip_ref',

        // SEO & Content Discovery
        'outbrain_', 'taboola_', 'revcontent_', 'mgid_',
        'content_discovery_', 'native_ad_', 'sponsored_content_',
        'amplify_', 'nativo_', 'dianomi_'
    ];

    initializeElements() {
        this.urlInput = document.getElementById('url-input');
        this.clearBtn = document.getElementById('clear-btn');
        this.detoxBtn = document.getElementById('detox-btn');
        this.resultContainer = document.getElementById('result-container');
        this.cleanUrl = document.getElementById('clean-url');
        this.copyBtn = document.getElementById('copy-btn');
        this.statusBadge = document.getElementById('status-badge');
        this.removedParams = document.getElementById('removed-params');
        this.paramsList = document.getElementById('params-list');
        this.toast = document.getElementById('toast');
        
        // Stats elements
        this.totalDetoxedEl = document.getElementById('total-detoxed');
        this.totalVisitorsEl = document.getElementById('total-visitors');
        this.monthlyVisitorsEl = document.getElementById('monthly-visitors');
        this.paramsRemovedEl = document.getElementById('params-removed');
          // Bulk processing elements
        this.bulkInput = document.getElementById('bulk-input');
        this.bulkProcessBtn = document.getElementById('bulk-process-btn');
        this.bulkClearBtn = document.getElementById('bulk-clear-btn');
        this.bulkResults = document.getElementById('bulk-results');
        this.bulkDownloadBtn = document.getElementById('bulk-download-btn');
        this.bulkCopyBtn = document.getElementById('bulk-copy-btn');
        this.bulkProgress = document.getElementById('bulk-progress');
        this.bulkProgressBar = document.getElementById('bulk-progress-bar');
        this.bulkProgressText = document.getElementById('bulk-progress-text');
        this.toggleBulkBtn = document.getElementById('toggle-bulk');
        this.bulkContainer = document.getElementById('bulk-container');
        this.bulkExportActions = document.getElementById('bulk-export-actions');
    }    bindEvents() {
        this.detoxBtn.addEventListener('click', () => this.detoxUrl());
        this.clearBtn.addEventListener('click', () => this.clearInput());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.urlInput.addEventListener('input', () => this.handleInput());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.detoxUrl();
        });
          // Bulk processing events
        this.bulkProcessBtn.addEventListener('click', () => this.processBulkUrls());
        this.bulkClearBtn.addEventListener('click', () => this.clearBulkInput());
        this.bulkDownloadBtn.addEventListener('click', () => this.downloadBulkResults());
        this.bulkCopyBtn.addEventListener('click', () => this.copyBulkResults());
        this.bulkInput.addEventListener('input', () => this.handleBulkInput());
        this.toggleBulkBtn.addEventListener('click', () => this.toggleBulkMode());
        
        // Auto-resize functionality for mobile
        this.urlInput.addEventListener('focus', () => this.scrollToInput());
    }

    handleInput() {
        const hasValue = this.urlInput.value.trim().length > 0;
        this.clearBtn.style.display = hasValue ? 'flex' : 'none';
        this.detoxBtn.disabled = !hasValue;
    }

    clearInput() {
        this.urlInput.value = '';
        this.urlInput.focus();
        this.resultContainer.style.display = 'none';
        this.handleInput();
    }

    scrollToInput() {
        setTimeout(() => {
            this.urlInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }    detoxUrl() {
        const url = this.urlInput.value.trim();
        
        if (!url) {
            this.showToast('Please enter a URL', 'error');
            return;
        }

        // Try to auto-fix common URL issues
        const fixedUrl = this.autoFixUrl(url);
        
        if (!this.isValidUrl(fixedUrl)) {
            this.showToast('Please enter a valid URL (e.g., https://example.com)', 'error');
            return;
        }

        try {
            const result = this.cleanUrlWithValidation(fixedUrl);
            
            // Update input if URL was auto-fixed
            if (fixedUrl !== url) {
                this.urlInput.value = fixedUrl;
                this.showToast('📝 URL format corrected automatically', 'info');
            }

            this.displayResult(result);
            this.updateStatsAfterDetox(result.removedParams.length);
        } catch (error) {
            console.error('Error cleaning URL:', error);
            this.showToast('Error processing URL. Please check the format.', 'error');
        }
    }

    autoFixUrl(url) {
        let fixed = url.trim();
        
        // Add protocol if missing
        if (!/^https?:\/\//i.test(fixed)) {
            // Check if it looks like a domain
            if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/.test(fixed)) {
                fixed = 'https://' + fixed;
            } else if (/^www\./i.test(fixed)) {
                fixed = 'https://' + fixed;
            }
        }
        
        // Remove multiple slashes after protocol
        fixed = fixed.replace(/([^:]\/)\/+/g, '$1');
        
        // Remove trailing slash from domain-only URLs
        fixed = fixed.replace(/^(https?:\/\/[^\/]+)\/$/, '$1');
        
        return fixed;
    }

    isValidUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }    // Enhanced URL cleaning with comprehensive validation and smart warnings
    cleanUrlWithValidation(originalUrl) {
        const url = new URL(originalUrl);
        const removedParams = [];
        const preservedParams = [];
        const warnings = [];
        const originalParamCount = url.searchParams.size;
        
        // Detect platform and functional parameters that should be preserved
        const platformInfo = this.detectPlatform(url);
        const functionalParams = this.getFunctionalParameters(platformInfo);
        
        // Check each parameter against our tracking detection
        for (const [key, value] of url.searchParams.entries()) {
            const isTracking = this.isTrackingParam(key);
            const isFunctional = this.isFunctionalParam(key, value, platformInfo);
            
            if (isTracking && !isFunctional) {
                removedParams.push({ key, value, type: this.getParamType(key) });
                url.searchParams.delete(key);
            } else if (isTracking && isFunctional) {
                // Tracking parameter that's also functional - keep but warn
                preservedParams.push({ key, value, reason: 'Required for functionality' });
                warnings.push(`Preserved tracking parameter '${key}' - needed for site functionality`);
            } else if (isFunctional) {
                // Functional parameter - keep silently
                preservedParams.push({ key, value, reason: 'Functional parameter' });
            }
        }

        // Check for common redirect and affiliate parameters that might break functionality
        this.validateCriticalParameters(url, removedParams, warnings);

        // Remove common tracking fragments and hashes
        let hashRemoved = false;
        if (url.hash && this.containsTrackingFragment(url.hash)) {
            const originalHash = url.hash;
            url.hash = '';
            hashRemoved = true;
            removedParams.push({ key: 'hash', value: originalHash, type: 'Fragment' });
        }

        // Clean up empty query strings
        if (url.search === '?') {
            url.search = '';
        }

        // Advanced cleaning: Remove AMP parameters with validation
        this.cleanAmpParameters(url, removedParams, warnings);

        // Remove redirect parameters with smart validation
        this.cleanRedirectParameters(url, removedParams, warnings);

        // Validate the cleaned URL is still functional
        const validationResult = this.validateCleanedUrl(originalUrl, url.toString(), platformInfo);
        if (validationResult.warnings.length > 0) {
            warnings.push(...validationResult.warnings);
        }

        const cleanedUrl = url.toString();
        const wasCleaned = removedParams.length > 0 || hashRemoved || cleanedUrl !== originalUrl;

        return {
            original: originalUrl,
            cleaned: cleanedUrl,
            removedParams,
            preservedParams,
            warnings,
            wasCleaned,
            originalParamCount,
            cleanedParamCount: url.searchParams.size,
            compressionRatio: originalParamCount > 0 ? ((originalParamCount - url.searchParams.size) / originalParamCount * 100).toFixed(1) : 0,
            platform: platformInfo,
            validationScore: this.calculateValidationScore(removedParams, preservedParams, warnings)
        };
    }

    // Detect the platform/service from URL
    detectPlatform(url) {
        const hostname = url.hostname.toLowerCase().replace('www.', '');
        const path = url.pathname.toLowerCase();
          // Major platforms with specific handling needs
        const platforms = {
            // E-commerce
            'amazon.com': { type: 'ecommerce', name: 'Amazon', requiresAuth: false },
            'amazon.co.uk': { type: 'ecommerce', name: 'Amazon UK', requiresAuth: false },
            'amazon.de': { type: 'ecommerce', name: 'Amazon DE', requiresAuth: false },
            'ebay.com': { type: 'ecommerce', name: 'eBay', requiresAuth: false },
            'etsy.com': { type: 'ecommerce', name: 'Etsy', requiresAuth: false },
            'shopify.com': { type: 'ecommerce', name: 'Shopify', requiresAuth: false },
            'wayfair.com': { type: 'ecommerce', name: 'Wayfair', requiresAuth: false },
            
            // Social Media & Content Platforms
            'facebook.com': { type: 'social', name: 'Facebook', requiresAuth: true },
            'instagram.com': { type: 'social', name: 'Instagram', requiresAuth: true },
            'twitter.com': { type: 'social', name: 'Twitter', requiresAuth: false },
            'x.com': { type: 'social', name: 'X (Twitter)', requiresAuth: false },
            'linkedin.com': { type: 'social', name: 'LinkedIn', requiresAuth: true },
            'tiktok.com': { type: 'social', name: 'TikTok', requiresAuth: false },
            'youtube.com': { type: 'video', name: 'YouTube', requiresAuth: false },
            'vimeo.com': { type: 'video', name: 'Vimeo', requiresAuth: false },
            'twitch.tv': { type: 'streaming', name: 'Twitch', requiresAuth: false },
            'discord.com': { type: 'social', name: 'Discord', requiresAuth: true },
            
            // Search Engines
            'google.com': { type: 'search', name: 'Google', requiresAuth: false },
            'bing.com': { type: 'search', name: 'Bing', requiresAuth: false },
            'duckduckgo.com': { type: 'search', name: 'DuckDuckGo', requiresAuth: false },
            
            // Business/SaaS
            'salesforce.com': { type: 'saas', name: 'Salesforce', requiresAuth: true },
            'hubspot.com': { type: 'saas', name: 'HubSpot', requiresAuth: true },
            'mailchimp.com': { type: 'email', name: 'Mailchimp', requiresAuth: true },
            'slack.com': { type: 'saas', name: 'Slack', requiresAuth: true },
            'zoom.us': { type: 'saas', name: 'Zoom', requiresAuth: true },
            'notion.so': { type: 'saas', name: 'Notion', requiresAuth: true },
            'airtable.com': { type: 'saas', name: 'Airtable', requiresAuth: true },
            
            // News/Media
            'cnn.com': { type: 'news', name: 'CNN', requiresAuth: false },
            'bbc.com': { type: 'news', name: 'BBC', requiresAuth: false },
            'reuters.com': { type: 'news', name: 'Reuters', requiresAuth: false },
            'nytimes.com': { type: 'news', name: 'New York Times', requiresAuth: false },
            'washingtonpost.com': { type: 'news', name: 'Washington Post', requiresAuth: false },
            
            // Travel
            'booking.com': { type: 'travel', name: 'Booking.com', requiresAuth: false },
            'expedia.com': { type: 'travel', name: 'Expedia', requiresAuth: false },
            'airbnb.com': { type: 'travel', name: 'Airbnb', requiresAuth: false },
            'tripadvisor.com': { type: 'travel', name: 'TripAdvisor', requiresAuth: false },
            
            // Streaming & Entertainment
            'netflix.com': { type: 'streaming', name: 'Netflix', requiresAuth: true },
            'hulu.com': { type: 'streaming', name: 'Hulu', requiresAuth: true },
            'disneyplus.com': { type: 'streaming', name: 'Disney+', requiresAuth: true },
            'hbomax.com': { type: 'streaming', name: 'HBO Max', requiresAuth: true },
            'spotify.com': { type: 'streaming', name: 'Spotify', requiresAuth: false },
            
            // Cryptocurrency & Web3
            'opensea.io': { type: 'crypto', name: 'OpenSea', requiresAuth: false },
            'rarible.com': { type: 'crypto', name: 'Rarible', requiresAuth: false },
            'foundation.app': { type: 'crypto', name: 'Foundation', requiresAuth: false },
            'superrare.com': { type: 'crypto', name: 'SuperRare', requiresAuth: false },
            'binance.com': { type: 'crypto', name: 'Binance', requiresAuth: true },
            'coinbase.com': { type: 'crypto', name: 'Coinbase', requiresAuth: true },
            'kraken.com': { type: 'crypto', name: 'Kraken', requiresAuth: true },
            'uniswap.org': { type: 'crypto', name: 'Uniswap', requiresAuth: false },
            
            // Food & Delivery
            'ubereats.com': { type: 'delivery', name: 'Uber Eats', requiresAuth: false },
            'doordash.com': { type: 'delivery', name: 'DoorDash', requiresAuth: false },
            'grubhub.com': { type: 'delivery', name: 'Grubhub', requiresAuth: false },
            'hellofresh.com': { type: 'delivery', name: 'HelloFresh', requiresAuth: false },
            
            // Education & Learning
            'udemy.com': { type: 'education', name: 'Udemy', requiresAuth: false },
            'coursera.org': { type: 'education', name: 'Coursera', requiresAuth: false },
            'edx.org': { type: 'education', name: 'edX', requiresAuth: false },
            'skillshare.com': { type: 'education', name: 'Skillshare', requiresAuth: false },
            'masterclass.com': { type: 'education', name: 'MasterClass', requiresAuth: false },
            
            // Gaming
            'steam.com': { type: 'gaming', name: 'Steam', requiresAuth: true },
            'epicgames.com': { type: 'gaming', name: 'Epic Games', requiresAuth: true },
            'origin.com': { type: 'gaming', name: 'Origin', requiresAuth: true },
            'battle.net': { type: 'gaming', name: 'Battle.net', requiresAuth: true },
            
            // Dating
            'tinder.com': { type: 'dating', name: 'Tinder', requiresAuth: true },
            'bumble.com': { type: 'dating', name: 'Bumble', requiresAuth: true },
            'hinge.co': { type: 'dating', name: 'Hinge', requiresAuth: true },
            'match.com': { type: 'dating', name: 'Match.com', requiresAuth: true },
            
            // Finance & Investment
            'robinhood.com': { type: 'finance', name: 'Robinhood', requiresAuth: true },
            'etrade.com': { type: 'finance', name: 'E*TRADE', requiresAuth: true },
            'schwab.com': { type: 'finance', name: 'Charles Schwab', requiresAuth: true },
            'fidelity.com': { type: 'finance', name: 'Fidelity', requiresAuth: true },
        };

        // Check for exact matches first
        if (platforms[hostname]) {
            return platforms[hostname];
        }

        // Check for subdomain matches
        for (const [domain, info] of Object.entries(platforms)) {
            if (hostname.endsWith('.' + domain)) {
                return { ...info, subdomain: true };
            }
        }

        // Generic platform detection based on patterns
        if (hostname.includes('shop') || hostname.includes('store') || path.includes('/shop') || path.includes('/store')) {
            return { type: 'ecommerce', name: 'E-commerce Site', requiresAuth: false };
        }
        
        if (hostname.includes('blog') || path.includes('/blog')) {
            return { type: 'blog', name: 'Blog', requiresAuth: false };
        }

        return { type: 'unknown', name: 'Unknown Platform', requiresAuth: false };
    }    // Get functional parameters that should be preserved for each platform
    getFunctionalParameters(platformInfo) {
        const functionalParams = {
            // Universal functional parameters
            universal: ['lang', 'language', 'locale', 'currency', 'region', 'country', 'hl', 'gl'],
            
            // E-commerce platforms
            ecommerce: ['variant', 'color', 'size', 'quantity', 'add-to-cart', 'product_id', 'sku', 'asin', 'dp'],
            
            // Social platforms
            social: ['t', 'thread', 'post', 'id', 'user', 'profile', 'page'],
            
            // Video platforms
            video: ['v', 't', 'time', 'start', 'end', 'list', 'index', 'playlist'],
            
            // Search engines
            search: ['q', 'query', 'search'],
            
            // SaaS platforms
            saas: ['workspace', 'org', 'team', 'project', 'dashboard'],
            
            // News/Media
            news: ['article', 'story', 'section', 'category'],
            
            // Travel platforms
            travel: ['checkin', 'checkout', 'guests', 'rooms', 'destination', 'location'],
            
            // Streaming platforms
            streaming: ['episode', 'season', 'series', 'movie', 'show', 'channel', 'timestamp', 'quality'],
            
            // Crypto & Web3 platforms
            crypto: ['collection', 'token_id', 'contract', 'wallet', 'chain', 'network', 'token_standard'],
            
            // Gaming platforms
            gaming: ['game_id', 'user_id', 'match_id', 'lobby', 'server', 'clan', 'guild'],
            
            // Dating platforms
            dating: ['profile_id', 'match_id', 'conversation', 'location', 'age_range'],
            
            // Finance platforms
            finance: ['account', 'portfolio', 'symbol', 'ticker', 'market', 'exchange'],
            
            // Education platforms
            education: ['course_id', 'lesson', 'module', 'instructor', 'category', 'level'],
            
            // Delivery platforms
            delivery: ['restaurant_id', 'item_id', 'location', 'delivery_time', 'promo_code']
        };

        const params = [...functionalParams.universal];
        if (functionalParams[platformInfo.type]) {
            params.push(...functionalParams[platformInfo.type]);
        }
        return params;
    }    // Check if a parameter is functional (needed for site operation)
    isFunctionalParam(key, value, platformInfo) {
        const lowerKey = key.toLowerCase();
        const functionalParams = this.getFunctionalParameters(platformInfo);
        
        // Check against platform-specific functional parameters
        if (functionalParams.some(param => lowerKey.includes(param.toLowerCase()))) {
            return true;
        }

        // Amazon-specific functional parameters
        if (platformInfo.name?.includes('Amazon')) {
            if (['asin', 'dp', 'keywords', 'field-keywords', 'node', 'ref'].includes(lowerKey)) {
                return true;
            }
        }

        // YouTube-specific functional parameters
        if (platformInfo.name === 'YouTube') {
            if (['v', 't', 'list', 'index', 'start', 'end', 'feature'].includes(lowerKey)) {
                return true;
            }
        }

        // Crypto/NFT platform parameters
        if (platformInfo.type === 'crypto') {
            if (['collection', 'token_id', 'contract_address', 'chain_id', 'network', 'wallet'].some(term => lowerKey.includes(term))) {
                return true;
            }
        }

        // Streaming platform parameters
        if (platformInfo.type === 'streaming') {
            if (['episode', 'season', 'series', 'show', 'movie', 'timestamp', 'quality'].some(term => lowerKey.includes(term))) {
                return true;
            }
        }

        // Gaming platform parameters
        if (platformInfo.type === 'gaming') {
            if (['game', 'match', 'lobby', 'server', 'clan', 'guild', 'user'].some(term => lowerKey.includes(term))) {
                return true;
            }
        }

        // Dating platform parameters
        if (platformInfo.type === 'dating') {
            if (['profile', 'match', 'conversation', 'age', 'location'].some(term => lowerKey.includes(term))) {
                return true;
            }
        }

        // Finance platform parameters
        if (platformInfo.type === 'finance') {
            if (['account', 'portfolio', 'symbol', 'ticker', 'market'].some(term => lowerKey.includes(term))) {
                return true;
            }
        }

        // Education platform parameters
        if (platformInfo.type === 'education') {
            if (['course', 'lesson', 'module', 'instructor', 'category'].some(term => lowerKey.includes(term))) {
                return true;
            }
        }

        // Social media post/content IDs
        if (platformInfo.type === 'social') {
            if (['id', 'post', 'story', 'reel', 'tweet', 'status'].some(term => lowerKey.includes(term))) {
                return true;
            }
        }

        // E-commerce product parameters
        if (platformInfo.type === 'ecommerce') {
            if (['product', 'item', 'variant', 'sku', 'color', 'size'].some(term => lowerKey.includes(term))) {
                return true;
            }
        }

        // Search parameters
        if (['q', 'query', 'search', 'term'].includes(lowerKey)) {
            return true;
        }

        // Authentication and session parameters (be very careful)
        if (platformInfo.requiresAuth && ['token', 'auth', 'session', 'login'].some(term => lowerKey.includes(term))) {
            return true;
        }

        return false;
    }    // Validate critical parameters before removal
    validateCriticalParameters(url, removedParams, warnings) {
        const hostname = url.hostname.toLowerCase();
        
        // Check for affiliate links that might break if cleaned too aggressively
        if (this.isAffiliateLink(url)) {
            warnings.push('🔗 This appears to be an affiliate link - some tracking may be necessary for functionality');
        }

        // Check for shortened URLs that might lose their destination
        if (this.isShortUrl(hostname)) {
            warnings.push('📎 This is a shortened URL - cleaning may affect redirect functionality');
        }

        // Check for email campaign links
        if (this.isEmailCampaignLink(url)) {
            warnings.push('📧 This appears to be from an email campaign - some parameters may be needed for analytics');
        }

        // Check for social media sharing links
        if (this.isSocialSharingLink(url)) {
            warnings.push('📱 This is a social media sharing link - some parameters may affect content display');
        }

        // Check for crypto/NFT marketplace links
        if (this.isCryptoLink(url)) {
            warnings.push('₿ This is a cryptocurrency/NFT link - some parameters may be needed for wallet connectivity');
        }

        // Check for streaming platform links
        if (this.isStreamingLink(url)) {
            warnings.push('📺 This is a streaming platform link - some parameters may be needed for content playback');
        }

        // Check for gaming platform links
        if (this.isGamingLink(url)) {
            warnings.push('🎮 This is a gaming platform link - some parameters may be needed for multiplayer functionality');
        }

        // Check for subscription service links
        if (this.isSubscriptionLink(url)) {
            warnings.push('💳 This appears to be a subscription service link - some parameters may be needed for billing');
        }

        // Check for educational platform links
        if (this.isEducationLink(url)) {
            warnings.push('🎓 This is an educational platform link - some parameters may be needed for course access');
        }
    }

    // Enhanced AMP parameter cleaning with validation
    cleanAmpParameters(url, removedParams, warnings) {
        const ampParams = ['amp', 'amp_js_v', 'amp_gsa', 'amp_ct', 'usqp', 'amp_tf'];
        let ampParamsFound = 0;
        
        ampParams.forEach(param => {
            if (url.searchParams.has(param)) {
                removedParams.push({ 
                    key: param, 
                    value: url.searchParams.get(param),
                    type: 'AMP'
                });
                url.searchParams.delete(param);
                ampParamsFound++;
            }
        });

        if (ampParamsFound > 0) {
            warnings.push(`🚀 Removed ${ampParamsFound} AMP parameters - the regular version should work fine`);
        }
    }

    // Enhanced redirect parameter cleaning with validation
    cleanRedirectParameters(url, removedParams, warnings) {
        const redirectParams = ['redirect_uri', 'return_url', 'next', 'continue', 'url', 'destination'];
        let criticalRedirectsFound = 0;
        
        redirectParams.forEach(param => {
            if (url.searchParams.has(param)) {
                const value = url.searchParams.get(param);
                if (this.looksLikeTracking(value)) {
                    removedParams.push({ 
                        key: param, 
                        value: value,
                        type: 'Redirect'
                    });
                    url.searchParams.delete(param);
                } else if (this.isImportantRedirect(value)) {
                    criticalRedirectsFound++;
                    warnings.push(`⚠️ Preserved redirect parameter '${param}' - may be needed for proper navigation`);
                }
            }
        });

        if (criticalRedirectsFound > 0) {
            warnings.push('🔄 Some redirect parameters were preserved to maintain functionality');
        }
    }    // Validate that the cleaned URL is still functional
    validateCleanedUrl(originalUrl, cleanedUrl, platformInfo) {
        const warnings = [];
        
        // Check if URL became significantly shorter (might indicate over-cleaning)
        const compressionRatio = ((originalUrl.length - cleanedUrl.length) / originalUrl.length) * 100;
        if (compressionRatio > 70) {
            warnings.push('⚠️ URL was significantly shortened - please verify it still works correctly');
        }

        // Check for platform-specific validation issues
        if (platformInfo.name === 'Amazon' && !cleanedUrl.includes('dp/') && !cleanedUrl.includes('gp/')) {
            warnings.push('🛒 Amazon link may not point to a specific product anymore');
        }

        if (platformInfo.name === 'YouTube' && !cleanedUrl.includes('v=') && !cleanedUrl.includes('watch')) {
            warnings.push('📺 YouTube link may not point to a specific video anymore');
        }

        if (platformInfo.type === 'social' && compressionRatio > 50) {
            warnings.push('📱 Social media link was heavily cleaned - may not work as expected');
        }

        // Crypto/NFT platform validations
        if (platformInfo.type === 'crypto') {
            if (platformInfo.name === 'OpenSea' && !cleanedUrl.includes('/assets/') && !cleanedUrl.includes('/collection/')) {
                warnings.push('🎨 OpenSea link may not point to a specific NFT or collection anymore');
            }
            if (compressionRatio > 40) {
                warnings.push('₿ Crypto platform link was significantly cleaned - wallet connectivity may be affected');
            }
        }

        // Streaming platform validations
        if (platformInfo.type === 'streaming') {
            if (platformInfo.name === 'Netflix' && compressionRatio > 30) {
                warnings.push('📺 Netflix link may not properly track viewing progress or recommendations');
            }
            if (platformInfo.name === 'Spotify' && !cleanedUrl.includes('track/') && !cleanedUrl.includes('playlist/')) {
                warnings.push('🎵 Spotify link may not point to a specific track or playlist anymore');
            }
        }

        // Gaming platform validations
        if (platformInfo.type === 'gaming') {
            if (platformInfo.name === 'Steam' && !cleanedUrl.includes('app/') && !cleanedUrl.includes('id/')) {
                warnings.push('🎮 Steam link may not point to a specific game or profile anymore');
            }
        }

        // Education platform validations
        if (platformInfo.type === 'education') {
            if (compressionRatio > 40) {
                warnings.push('🎓 Educational platform link was heavily cleaned - course access may be affected');
            }
        }

        // Finance platform validations
        if (platformInfo.type === 'finance') {
            if (compressionRatio > 30) {
                warnings.push('💳 Financial platform link was cleaned - account access may be affected');
            }
        }

        return { warnings };
    }

    // Calculate a validation score (0-100) for the cleaning result
    calculateValidationScore(removedParams, preservedParams, warnings) {
        let score = 100;
        
        // Deduct points for warnings
        score -= warnings.length * 5;
        
        // Deduct points if too many functional parameters were preserved
        const functionalPreserved = preservedParams.filter(p => p.reason === 'Required for functionality').length;
        score -= functionalPreserved * 10;
        
        // Add points for successful parameter removal
        score += Math.min(removedParams.length * 2, 20);
        
        return Math.max(0, Math.min(100, score));
    }

    // Helper methods for link validation
    isAffiliateLink(url) {
        const affiliateIndicators = ['affiliate', 'aff', 'ref', 'partner', 'commission', 'earn'];
        const urlString = url.toString().toLowerCase();
        return affiliateIndicators.some(indicator => urlString.includes(indicator));
    }

    isShortUrl(hostname) {
        const shortDomains = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'short.link', 'tiny.cc'];
        return shortDomains.some(domain => hostname.includes(domain));
    }

    isEmailCampaignLink(url) {
        const emailIndicators = ['email', 'newsletter', 'campaign', 'mailchimp', 'constantcontact'];
        const urlString = url.toString().toLowerCase();
        return emailIndicators.some(indicator => urlString.includes(indicator));
    }    isSocialSharingLink(url) {
        const sharingIndicators = ['share', 'post', 'story', 'tweet', 'pin'];
        const urlString = url.toString().toLowerCase();
        return sharingIndicators.some(indicator => urlString.includes(indicator));
    }

    isCryptoLink(url) {
        const cryptoIndicators = ['opensea', 'rarible', 'foundation', 'superrare', 'nft', 'binance', 'coinbase', 'kraken', 'crypto', 'blockchain', 'ethereum', 'bitcoin'];
        const urlString = url.toString().toLowerCase();
        return cryptoIndicators.some(indicator => urlString.includes(indicator));
    }

    isStreamingLink(url) {
        const streamingIndicators = ['netflix', 'hulu', 'disney', 'hbo', 'spotify', 'youtube', 'twitch', 'stream'];
        const urlString = url.toString().toLowerCase();
        return streamingIndicators.some(indicator => urlString.includes(indicator));
    }

    isGamingLink(url) {
        const gamingIndicators = ['steam', 'epic', 'origin', 'battle.net', 'xbox', 'playstation', 'nintendo', 'gaming'];
        const urlString = url.toString().toLowerCase();
        return gamingIndicators.some(indicator => urlString.includes(indicator));
    }

    isSubscriptionLink(url) {
        const subscriptionIndicators = ['subscription', 'premium', 'pro', 'plus', 'billing', 'payment', 'checkout'];
        const urlString = url.toString().toLowerCase();
        return subscriptionIndicators.some(indicator => urlString.includes(indicator));
    }

    isEducationLink(url) {
        const educationIndicators = ['udemy', 'coursera', 'edx', 'skillshare', 'masterclass', 'course', 'learning', 'education'];
        const urlString = url.toString().toLowerCase();
        return educationIndicators.some(indicator => urlString.includes(indicator));
    }

    isImportantRedirect(value) {
        try {
            const redirectUrl = new URL(value);
            // If it's a valid URL pointing to a different domain, it's probably important
            return redirectUrl.hostname !== '';
        } catch {
            return false;
        }
    }    // Get parameter type for better categorization
    getParamType(key) {
        const lowerKey = key.toLowerCase();
        
        if (/^utm_/.test(lowerKey)) return 'UTM Campaign';
        if (/^fb/.test(lowerKey)) return 'Facebook';
        if (/^_ga/.test(lowerKey)) return 'Google Analytics';
        if (/^aff_|affiliate/.test(lowerKey)) return 'Affiliate';
        if (/email|newsletter/.test(lowerKey)) return 'Email Marketing';
        if (/^mc_/.test(lowerKey)) return 'Mailchimp';
        if (/social|share/.test(lowerKey)) return 'Social Media';
        if (/search|query/.test(lowerKey)) return 'Search';
        if (/mobile|app/.test(lowerKey)) return 'Mobile App';
        if (/ad|advertisement/.test(lowerKey)) return 'Advertising';
        if (/crypto|nft|blockchain|wallet/.test(lowerKey)) return 'Crypto/Web3';
        if (/stream|video|audio|media/.test(lowerKey)) return 'Streaming';
        if (/gaming|game|esports/.test(lowerKey)) return 'Gaming';
        if (/course|education|learning/.test(lowerKey)) return 'Education';
        if (/subscription|premium|billing/.test(lowerKey)) return 'Subscription';
        if (/creator|influencer|ambassador/.test(lowerKey)) return 'Creator Economy';
        if (/tiktok|tt_/.test(lowerKey)) return 'TikTok';
        if (/instagram|ig_/.test(lowerKey)) return 'Instagram';
        if (/youtube|yt_/.test(lowerKey)) return 'YouTube';
        if (/linkedin|li_/.test(lowerKey)) return 'LinkedIn';
        if (/twitter|tw_/.test(lowerKey)) return 'Twitter/X';
        
        return 'Tracking';
    }

    cleanUrl(originalUrl) {
        // Legacy method - redirect to enhanced version
        return this.cleanUrlWithValidation(originalUrl);
    }

    looksLikeTracking(value) {
        // Check if a parameter value looks like tracking data
        const trackingPatterns = [
            /^utm_/i,
            /^ga\d+/i,
            /^[a-f0-9]{32,}$/i,  // Hash-like strings
            /^\d{13,}$/,         // Timestamps
            /^[A-Z0-9]{20,}$/,   // Long uppercase alphanumeric
        ];
        return trackingPatterns.some(pattern => pattern.test(value));
    }isTrackingParam(param) {
        const lowerParam = param.toLowerCase();
        
        // Exact matches from our comprehensive database
        if (this.trackingParams.includes(lowerParam)) {
            return true;
        }
        
        // Enhanced pattern-based matches for sophisticated tracking
        const patterns = [
            // Standard UTM and campaign parameters
            /^utm_/i,
            /^campaign/i,
            /^source/i,
            /^medium/i,
            /^content/i,
            /^term/i,
            
            // Social media platform patterns
            /^fb/i,              // Facebook/Meta
            /^ig/i,              // Instagram
            /^tw/i,              // Twitter
            /^li_/i,             // LinkedIn
            /^tt_/i,             // TikTok
            /^pin_/i,            // Pinterest
            /^sc_/i,             // Snapchat
            
            // Google ecosystem
            /^_ga/i,             // Google Analytics
            /^gclid/i,           // Google Click ID
            /^gtm_/i,            // Google Tag Manager
            /^_gl/i,             // Google cross-domain tracking
            /^gs_/i,             // Google search
            
            // Analytics and tracking platforms
            /^mc_/i,             // MailChimp
            /^_hs/i,             // HubSpot
            /^adobe_/i,          // Adobe Analytics
            /^pk_/i,             // Piwik/Matomo
            /^mtm_/i,            // Matomo Tag Manager
            /^mixpanel_/i,       // Mixpanel
            /^segment_/i,        // Segment
            
            // E-commerce platforms
            /^pf_rd_/i,          // Amazon
            /^pd_rd_/i,          // Amazon
            /^sca_/i,            // Shopify
            /^wc_/i,             // WooCommerce
            /^bc_/i,             // BigCommerce
            
            // Email marketing
            /^elq/i,             // Eloqua
            /^vero_/i,           // Vero
            /^sg_/i,             // SendGrid
            /^klaviyo/i,         // Klaviyo
            /^_ke/i,             // Klaviyo
            
            // Affiliate and referral tracking
            /^aff_/i,            // Affiliate
            /^ref_/i,            // Reference
            /^track/i,           // General tracking
            /^click/i,           // Click tracking
            /^subid/i,           // Sub IDs
            
            // Mobile attribution
            /^adjust_/i,         // Adjust
            /^af_/i,             // AppsFlyer
            /^branch_/i,         // Branch
            /^singular_/i,       // Singular
            
            // International platforms
            /^baidu_/i,          // Baidu
            /^weibo_/i,          // Weibo
            /^ym_/i,             // Yandex Metrica
            /^vk_/i,             // VKontakte
            /^naver_/i,          // Naver
            /^kakao_/i,          // Kakao
            
            // Advanced tracking patterns
            /^at_/i,             // AT Internet
            /^trc_/i,            // Taboola/Outbrain
            /^_bta_/i,           // Bronto
            /^msclkid/i,         // Microsoft Click ID
            /^yclid/i,           // Yandex Click ID
            /^fbclid/i,          // Facebook Click ID
            
            // Generic tracking patterns
            /^\d{10,}$/,         // Long numeric strings (timestamps, IDs)
            /^[a-f0-9]{32}$/i,   // MD5 hashes
            /^[a-f0-9]{40}$/i,   // SHA1 hashes
            /^[a-z0-9]{20,}$/i,  // Long alphanumeric strings
            
            // Session and visitor tracking
            /^session/i,
            /^visitor/i,
            /^user_?id/i,
            /^client_?id/i,
            /^device_?id/i,
            /^browser_?id/i,
            
            // Timestamp and cache busting
            /^timestamp/i,
            /^time/i,
            /^cache/i,
            /^random/i,
            /^nonce/i,
            /^hash/i,
            /^token/i,
            /^signature/i,
            
            // Debug and development
            /^debug/i,
            /^test/i,
            /^dev/i,
            /^staging/i,
            /^preview/i,
            
            // Generic suspicious patterns
            /^_+$/,              // Just underscores
            /^[_-]+[a-z]/i,      // Starting with underscores/dashes
            /tracking/i,         // Contains "tracking"
            /analytics/i,        // Contains "analytics"
            /campaign/i,         // Contains "campaign"
        ];
        
        return patterns.some(pattern => pattern.test(param));
    }

    containsTrackingFragment(hash) {
        const trackingFragments = ['utm_', 'fb', 'gclid', 'ref'];
        return trackingFragments.some(fragment => hash.includes(fragment));
    }    displayResult(result) {
        this.cleanUrl.value = result.cleaned;
        
        // Update status badge with comprehensive information
        if (result.wasCleaned) {
            this.statusBadge.textContent = `✅ Cleaned (${result.removedParams.length} param${result.removedParams.length === 1 ? '' : 's'} removed)`;
            this.statusBadge.className = 'status-badge cleaned';
        } else {
            this.statusBadge.textContent = '✨ Already clean';
            this.statusBadge.className = 'status-badge already-clean';
        }

        // Show removed parameters if any
        if (result.removedParams.length > 0) {
            this.paramsList.innerHTML = '';
            
            // Group parameters by type for better organization
            const groupedParams = this.groupParametersByType(result.removedParams);
            
            Object.entries(groupedParams).forEach(([type, params]) => {
                if (params.length > 0) {
                    // Create group header
                    const groupHeader = document.createElement('div');
                    groupHeader.className = 'param-group-header';
                    groupHeader.textContent = `${type} (${params.length})`;
                    this.paramsList.appendChild(groupHeader);
                    
                    // Add parameters in this group
                    params.forEach(param => {
                        const li = document.createElement('li');
                        li.className = 'param-item';
                        
                        const paramName = document.createElement('span');
                        paramName.className = 'param-name';
                        paramName.textContent = param.key;
                        
                        const paramValue = document.createElement('span');
                        paramValue.className = 'param-value';
                        paramValue.textContent = `= ${param.value.length > 50 ? param.value.substring(0, 50) + '...' : param.value}`;
                        
                        li.appendChild(paramName);
                        li.appendChild(paramValue);
                        this.paramsList.appendChild(li);
                    });
                }
            });
            
            this.removedParams.style.display = 'block';
        } else {
            this.removedParams.style.display = 'none';
        }

        this.resultContainer.style.display = 'block';
        this.resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Reset copy button
        this.copyBtn.textContent = 'Copy';
        this.copyBtn.classList.remove('copied');
        
        // Show toast with summary
        if (result.wasCleaned) {
            this.showToast(`🎉 Removed ${result.removedParams.length} tracking parameters!`, 'success');
        }
    }

    groupParametersByType(params) {
        const groups = {
            'Social Media': [],
            'Analytics': [],
            'Email Marketing': [],
            'E-commerce': [],
            'Search Engines': [],
            'Mobile Apps': [],
            'Advertising': [],
            'Other': []
        };

        params.forEach(param => {
            const key = param.key.toLowerCase();
            
            if (/^(fb|ig|tw|li_|tt_|pin_|sc_)/.test(key) || ['fbclid', 'igshid', 'twclid'].includes(key)) {
                groups['Social Media'].push(param);
            } else if (/^(_ga|_hs|adobe_|pk_|mtm_|mixpanel_)/.test(key) || key.includes('analytics')) {
                groups['Analytics'].push(param);
            } else if (/^(mc_|elq|sg_|klaviyo|_ke)/.test(key) || key.includes('email')) {
                groups['Email Marketing'].push(param);
            } else if (/^(pf_rd_|pd_rd_|sca_|wc_|bc_)/.test(key) || ['tag', 'ref'].includes(key)) {
                groups['E-commerce'].push(param);
            } else if (/^(gclid|msclkid|yclid)/.test(key) || key.includes('search')) {
                groups['Search Engines'].push(param);
            } else if (/^(adjust_|af_|branch_)/.test(key) || key.includes('app')) {
                groups['Mobile Apps'].push(param);
            } else if (/^(utm_|campaign|aff_|click)/.test(key) || key.includes('ad')) {
                groups['Advertising'].push(param);
            } else {
                groups['Other'].push(param);
            }
        });

        return groups;
    }

    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.cleanUrl.value);
            this.copyBtn.textContent = 'Copied!';
            this.copyBtn.classList.add('copied');
            this.showToast('URL copied to clipboard!');
            
            setTimeout(() => {
                this.copyBtn.textContent = 'Copy';
                this.copyBtn.classList.remove('copied');
            }, 2000);
        } catch (error) {
            // Fallback for older browsers
            this.cleanUrl.select();
            document.execCommand('copy');
            this.showToast('URL copied to clipboard!');
        }
    }    showToast(message, type = 'success') {
        // Remove any existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Add icon based on type
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.success}</span>
            <span class="toast-message">${message}</span>
        `;
        
        // Add to document
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto-remove after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, type === 'error' ? 5000 : 3000);
    }

    // Statistics management
    loadStats() {
        const defaultStats = {
            totalDetoxed: 0,
            totalVisitors: 0,
            monthlyVisitors: 0,
            paramsRemoved: 0,
            lastVisitMonth: new Date().getMonth()
        };
        
        const saved = localStorage.getItem('linkdetox-stats');
        const stats = saved ? { ...defaultStats, ...JSON.parse(saved) } : defaultStats;
        
        return stats;
    }

    saveStats() {
        localStorage.setItem('linkdetox-stats', JSON.stringify(this.stats));
    }

    trackVisitor() {
        const currentMonth = new Date().getMonth();
        
        // Reset monthly count if it's a new month
        if (this.stats.lastVisitMonth !== currentMonth) {
            this.stats.monthlyVisitors = 0;
            this.stats.lastVisitMonth = currentMonth;
        }
        
        // Only count unique visits per session
        if (!sessionStorage.getItem('linkdetox-visited')) {
            this.stats.totalVisitors++;
            this.stats.monthlyVisitors++;
            sessionStorage.setItem('linkdetox-visited', 'true');
            this.saveStats();
        }
    }

    updateStatsAfterDetox(paramsCount) {
        this.stats.totalDetoxed++;
        this.stats.paramsRemoved += paramsCount;
        this.saveStats();
        this.updateStats();
    }

    updateStats() {
        this.animateNumber(this.totalDetoxedEl, this.stats.totalDetoxed);
        this.animateNumber(this.totalVisitorsEl, this.stats.totalVisitors);
        this.animateNumber(this.monthlyVisitorsEl, this.stats.monthlyVisitors);
        this.animateNumber(this.paramsRemovedEl, this.stats.paramsRemoved);
    }

    animateNumber(element, target) {
        const start = parseInt(element.textContent) || 0;
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (target - start) * this.easeOutQuart(progress));
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }    // Bulk processing functionality
    toggleBulkMode() {
        this.isBulkMode = this.bulkContainer.style.display === 'none';
        
        if (this.isBulkMode) {
            this.bulkContainer.style.display = 'block';
            this.toggleBulkBtn.textContent = 'Disable Bulk Mode';
            this.toggleBulkBtn.classList.add('active');
            this.bulkInput.focus();
        } else {
            this.bulkContainer.style.display = 'none';
            this.toggleBulkBtn.textContent = 'Enable Bulk Mode';
            this.toggleBulkBtn.classList.remove('active');
            this.clearBulkInput();
        }
    }

    handleBulkInput() {
        const hasValue = this.bulkInput.value.trim().length > 0;
        this.bulkClearBtn.style.display = hasValue ? 'flex' : 'none';
        this.bulkProcessBtn.disabled = !hasValue;
    }    clearBulkInput() {
        this.bulkInput.value = '';
        this.bulkInput.focus();
        this.bulkResults.style.display = 'none';
        this.bulkProgress.style.display = 'none';
        if (this.bulkExportActions) {
            this.bulkExportActions.style.display = 'none';
        }
        this.handleBulkInput();
    }    async processBulkUrls() {
        const text = this.bulkInput.value.trim();
        if (!text) {
            this.showToast('Please enter URLs to process', 'error');
            return;
        }

        // Extract URLs from text
        const urls = this.extractUrls(text);
        if (urls.length === 0) {
            this.showToast('No valid URLs found in the input', 'error');
            return;
        }

        // Show progress bar
        this.bulkProgress.style.display = 'block';
        this.bulkResults.style.display = 'none';
        this.bulkProcessBtn.disabled = true;        const results = [];
        const batchSize = urls.length > 100 ? 20 : 10; // Larger batches for big lists
        
        for (let i = 0; i < urls.length; i += batchSize) {
            const batch = urls.slice(i, i + batchSize);
            
            // Process batch
            for (const originalUrl of batch) {
                try {
                    const result = this.cleanUrl(originalUrl);
                    results.push({
                        original: originalUrl,
                        cleaned: result.cleaned,
                        removed: result.removedParams,
                        compression: result.compressionRatio,
                        status: result.removedParams.length > 0 ? 'cleaned' : 'clean'
                    });
                } catch (error) {
                    results.push({
                        original: originalUrl,
                        cleaned: originalUrl,
                        removed: [],
                        compression: 0,
                        status: 'error',
                        error: error.message
                    });
                }                processed++;
                this.updateBulkProgress(processed, urls.length, startTime);
            }

            // Yield control to browser for UI updates
            if (i + batchSize < urls.length) {
                await new Promise(resolve => setTimeout(resolve, urls.length > 100 ? 5 : 10));
            }
        }

        // Update statistics
        const totalParamsRemoved = results.reduce((sum, r) => sum + r.removed.length, 0);
        this.updateStatsAfterDetox(totalParamsRemoved);        // Show results
        this.displayBulkResults(results);
        this.bulkProgress.style.display = 'none';
        this.bulkProcessBtn.disabled = false;
        if (this.bulkExportActions) {
            this.bulkExportActions.style.display = 'flex';
        }

        this.showToast(`🎉 Processed ${results.length} URLs, removed ${totalParamsRemoved} tracking parameters!`, 'success');
    }

    extractUrls(text) {
        // Enhanced URL regex that captures various URL formats
        const urlRegex = /https?:\/\/[^\s<>"]+|www\.[^\s<>"]+|[a-zA-Z0-9][a-zA-Z0-9-]*\.com[^\s<>"]*/g;
        const matches = text.match(urlRegex) || [];
        
        return matches.map(url => {
            // Auto-fix URLs without protocol
            if (!url.startsWith('http')) {
                return url.startsWith('www.') ? `https://${url}` : `https://${url}`;
            }
            return url;
        }).filter((url, index, arr) => arr.indexOf(url) === index); // Remove duplicates
    }    updateBulkProgress(current, total, startTime = null) {
        const percentage = Math.round((current / total) * 100);
        this.bulkProgressBar.style.width = `${percentage}%`;
        
        let progressText = `Processing ${current}/${total} URLs (${percentage}%)`;
        
        // Add estimated time remaining if processing has started
        if (startTime && current > 0) {
            const elapsed = Date.now() - startTime;
            const avgTimePerUrl = elapsed / current;
            const remaining = (total - current) * avgTimePerUrl;
            
            if (remaining > 1000) {
                const seconds = Math.round(remaining / 1000);
                progressText += ` - ~${seconds}s remaining`;
            }
        }
        
        this.bulkProgressText.textContent = progressText;
    }

    displayBulkResults(results) {
        const cleanedCount = results.filter(r => r.status === 'cleaned').length;
        const alreadyCleanCount = results.filter(r => r.status === 'clean').length;
        const errorCount = results.filter(r => r.status === 'error').length;

        let html = `
            <div class="bulk-summary">
                <h3>Bulk Processing Results</h3>
                <div class="summary-stats">
                    <div class="stat-item">
                        <span class="stat-value">${results.length}</span>
                        <span class="stat-label">Total URLs</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${cleanedCount}</span>
                        <span class="stat-label">Cleaned</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${alreadyCleanCount}</span>
                        <span class="stat-label">Already Clean</span>
                    </div>
                    ${errorCount > 0 ? `
                    <div class="stat-item">
                        <span class="stat-value">${errorCount}</span>
                        <span class="stat-label">Errors</span>
                    </div>
                    ` : ''}
                </div>
            </div>
            <div class="bulk-results-list">
        `;

        results.forEach((result, index) => {
            const statusClass = result.status === 'cleaned' ? 'cleaned' : result.status === 'clean' ? 'clean' : 'error';
            const statusIcon = result.status === 'cleaned' ? '🧹' : result.status === 'clean' ? '✅' : '❌';
            
            html += `
                <div class="bulk-result-item ${statusClass}">
                    <div class="result-header">
                        <span class="result-index">${index + 1}</span>
                        <span class="result-status">${statusIcon}</span>
                        <span class="result-domain">${this.extractDomain(result.original)}</span>
                        ${result.removed.length > 0 ? `<span class="param-count">${result.removed.length} params removed</span>` : ''}
                        ${result.compression > 0 ? `<span class="compression">${result.compression}% smaller</span>` : ''}
                    </div>
                    <div class="result-urls">
                        <div class="url-row original">
                            <span class="url-label">Original:</span>
                            <span class="url-value">${this.truncateUrl(result.original)}</span>
                        </div>
                        <div class="url-row cleaned">
                            <span class="url-label">Cleaned:</span>
                            <span class="url-value">${this.truncateUrl(result.cleaned)}</span>
                        </div>
                    </div>
                    ${result.removed.length > 0 ? `
                    <div class="removed-params-bulk">
                        <span class="params-label">Removed:</span>
                        <span class="params-values">${result.removed.slice(0, 5).join(', ')}${result.removed.length > 5 ? ` +${result.removed.length - 5} more` : ''}</span>
                    </div>
                    ` : ''}
                    ${result.error ? `<div class="error-message">Error: ${result.error}</div>` : ''}
                </div>
            `;
        });

        html += '</div>';
        this.bulkResults.innerHTML = html;
        this.bulkResults.style.display = 'block';

        // Store results for export
        this.lastBulkResults = results;
    }

    copyBulkResults() {
        if (!this.lastBulkResults) {
            this.showToast('No results to copy', 'error');
            return;
        }

        const cleanedUrls = this.lastBulkResults.map(r => r.cleaned).join('\n');
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(cleanedUrls).then(() => {
                this.showToast(`Copied ${this.lastBulkResults.length} cleaned URLs to clipboard!`, 'success');
            }).catch(() => {
                this.fallbackCopy(cleanedUrls);
            });
        } else {
            this.fallbackCopy(cleanedUrls);
        }
    }

    downloadBulkResults() {
        if (!this.lastBulkResults) {
            this.showToast('No results to download', 'error');
            return;
        }

        const csvContent = this.generateCsvReport();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `linkdetox-results-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showToast('Results downloaded as CSV file!', 'success');
        } else {
            this.showToast('Download not supported in this browser', 'error');
        }
    }

    generateCsvReport() {
        const headers = ['Original URL', 'Cleaned URL', 'Parameters Removed', 'Compression %', 'Status'];
        const rows = this.lastBulkResults.map(result => [
            `"${result.original}"`,
            `"${result.cleaned}"`,
            result.removed.length,
            result.compression,
            result.status
        ]);

        return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    }

    extractDomain(url) {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return 'Invalid URL';
        }
    }

    truncateUrl(url, maxLength = 60) {
        if (url.length <= maxLength) return url;
        return url.substring(0, maxLength - 3) + '...';
    }

    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showToast(`Copied ${this.lastBulkResults.length} cleaned URLs to clipboard!`, 'success');
        } catch (err) {
            this.showToast('Failed to copy to clipboard', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.linkDetoxInstance = new LinkDetoxer();
});

// Add some easter eggs and enhanced functionality
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const linkDetox = window.linkDetoxInstance;
        if (linkDetox && linkDetox.isBulkMode) {
            document.getElementById('bulk-input').focus();
        } else {
            document.getElementById('url-input').focus();
        }
    }
    
    // Ctrl/Cmd + B to toggle bulk mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        const linkDetox = window.linkDetoxInstance;
        if (linkDetox) {
            linkDetox.toggleBulkMode();
        }
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        const input = document.getElementById('url-input');
        const bulkInput = document.getElementById('bulk-input');
        if (input === document.activeElement) {
            input.blur();
        } else if (bulkInput === document.activeElement) {
            bulkInput.blur();
        } else {
            input.value = '';
            bulkInput.value = '';
            document.getElementById('result-container').style.display = 'none';
            document.getElementById('bulk-results').style.display = 'none';
        }
    }
});

// Add paste detection for better UX
document.getElementById('url-input').addEventListener('paste', (e) => {
    setTimeout(() => {
        const button = document.getElementById('detox-btn');
        if (button && !button.disabled) {
            button.focus();
        }
    }, 100);
});
