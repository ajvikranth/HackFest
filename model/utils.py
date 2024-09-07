import math

def handle_get_kilometer_from_gps(lat1, lon1, lat2, lon2):
    R = 6371.0
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad
    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return distance


# main_gps  = 49.4873357297657, 8.466263441912194
# a1 = 49.46714125585514, 8.481209709068896
# a2 = 49.546064226685544, 8.441416765251992
# a3  = 49.51673542357937, 8.353278664116408
# a4 = 49.45735006577803, 8.422489683636131

# distance = handle_get_kilometer_from_gps(float(main_gps[0]), float(main_gps[1]), float(a1[0]), float(a1[1]))
# print(f"Distance between locations: {distance:.2f} km")
