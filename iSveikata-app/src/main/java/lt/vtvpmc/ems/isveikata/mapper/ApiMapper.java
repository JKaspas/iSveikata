package lt.vtvpmc.ems.isveikata.mapper;

import java.util.List;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import lt.vtvpmc.ems.isveikata.api.Api;
import lt.vtvpmc.ems.isveikata.api.ApiDto;

@org.mapstruct.Mapper(componentModel="spring")
public interface ApiMapper {
	
	ApiMapper MAPPER = Mappers.getMapper(ApiMapper.class);
	
		@Mappings({
			@Mapping(source = "title", target = "activeIngredientName"),
			@Mapping(source = "description", target = "description"),
			@Mapping(source = "measurements", target = "measurementUnit")
		})
		ApiDto fromApi(Api api);
		
		@InheritInverseConfiguration
		Api toApi(ApiDto apiDto);
		
		List<ApiDto> fromApis(List<Api> apis);

}
